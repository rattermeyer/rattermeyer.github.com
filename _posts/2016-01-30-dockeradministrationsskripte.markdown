---
layout: post
title: "Docker Wartungsskripte"
date: "2016-01-30 11:37:29"
authors:
  - richard.attermeyer
tags:
  - "docker"
  - "container"
categories:
  - "devops"
---
Wenn man eine Umgebung mit einigen Docker Containern managed, so fallen immer wieder Administrationsaufgaben an.

In unserer Umgebung sind dies

* Entdecken und abräumen von "toten" Containern
* Abräumen von Containern, die schon länger nicht mehr laufen
* Abräumen von Images, die zu keinem Container gehören
* Abräumen von nicht mehr genutzten Volumes

### Abräumen von nicht mehr lebendigen Containern
Ein Container, der nicht mehr läuft kann verschiedene Status haben.
Normalerweise hat so ein Container den Status "Exited".
Um die soll es jetzt erst gehen.
Es gibt verschiedene Methoden Container, die nicht mehr laufen abzuräumen.
Ad-hoc verwende ich häufig das Kommando

    docker rm $(docker ps -aq)

Da das Abräumen nicht erzwungen wird, werden laufende Container nicht beseitigt.
Dieses Vorgehen ist etwas naiv und man muss sich sicher sein, dass die nicht-laufenden Container nicht später einfach wieder neu gestartet werden sollen.

Für einen cronjob ist dieses Vorgehen daher in der Regel zu einfach. Allerdings gibt es ein [Garbage Collection Skript von Spotify](https://github.com/spotify/docker-gc) welches eine verfeinerte Strategie anwendet.

Allerdings kann es auch vorkommen, dass beim runterfahren eines Containers dieser hängen bleibt. Wir haben das häufiger gesehen, wenn wir einen logstash forwarder laufen hatten, der die Json logs eines Containers bearbeitet. Dann bleibt der Container im Zustand "Dead" stehen.

Diese Container kann man auch identifizieren und abräumen:

    docker ps -a | grep -v 'Up ' | grep 'Dead' | awk '{print $1}' \
    | xargs -r docker rm

Manchmal kann es sein, dass das nicht klappt. Dann hilft nur ein [Abräumen auf dem Host Dateisystem](http://stackoverflow.com/questions/30794108/docker-cannot-remove-dead-container) weiter.

### Abräumen von ungenutzten Images
Hier gibt es zwei wesentliche Aspekte. Wenn man Docker Images entwickelt, dann kann es sein, dass ein Dockerfile nicht erfolgreich durchläuft. Es entstehen dann nicht getaggte Images (`<none>`).

Diese kann man wie folgt abräumen:

    docker rmi $(docker images | grep "^<none>" | awk '{print $3'})

Allerdings kann es auch sein, dass z.b. in einer Continuous Delivery Umgebung auf entsprechenden Docker Hosts Images rumliegen, die aber nicht mehr benötigt werden.
Auch hier hilft das schon erwähnte [Garbage Collection Skript von Spotify](https://github.com/spotify/docker-gc) weiter.

### Abräumen von ungenutzten Volumes
Volumes sind normalerweise dafür da persistente Daten zu speichern, die einen Container Neustart überleben sollen.
Wenn man allerdings in einer Continuous Delivery Pipeline etwa mit Datenbank Containern arbeitet, kann es dazu kommen, dass sich ungenutzte Volumes durch verschiedene Testläufe ansammeln und Platz belegen. In der Regel sind in einer CD Umgebung daher nur Volumes interessant, zu denen es auch tatsächlich noch Container gibt. Es ergibt sich daher die Notwendigkeit regelmäßig entsprechende Volumes abzuräumen.
Dies ist durch verschiedene Skripte möglich.
Es gibt auf github verschiedene Skripte, die darauf beruhen, die genutzten Pfade der Volumes von noch existierenden Containern zu sammeln und alle anderen Volumes aus dem `/var/lib/docker/volumes` (Standardverzeichnis für Volumes) zu entfernen.

Im folgenden sind zwei entsprechende Bash Skripte verlinkt.   

* [Bash Skript](https://github.com/chadoe/docker-cleanup-volumes/blob/master/docker-cleanup-volumes.sh)
* [Python Skript](https://github.com/darthbinamira/dotfiles/blob/1859a36afba2252f86a0a1ff8d5fb442e74b7a0e/tools/docker_clean_vfs.py)
