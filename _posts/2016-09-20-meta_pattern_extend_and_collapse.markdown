---
layout: post
title: "Meta Pattern: Expand-and-Collapse"
date: "2016-09-20"
authors:
  - richard.attermeyer
categories:
  - Softwarearchitektur
tags:
  - Continuous Delivery
  - Softwarearchitektur
---
Vielleicht ist es etwas wirr, wass ich hier vorstelle, aber mir ist so etwas wie ein "Meta-Pattern" unterkommen.
Ein abstraktes Muster, für das es mehrere konkrete Patterns gibt.
Dieses Abstrakte Muster finde ich interessant als Denkmuster für verschiedene Situationen einfach nutzen zu können.

In diesem ersten Post betrachte ich einmal das Expand-and-Collapse Muster.

Um uns diesem Muster zu nähern gehen wir induktiv vor und schauen uns einmal ein paar Beispiele an.

## Unterstützung von mehreren Versionen eines Services
Im Rahmen einer SOA ist es ein häufiges Muster, dass aufgrund von Änderungen an einer Serviceschnittstelle mehrere Versionen eines Services in betrieben werden.
Häufig ist es nicht möglich, dass alle Konsumenten gleichzeitig mit der Schnittstellenänderung aktualisiert werden.
Aus diesem Grund werden [mehrere Versionen eines Services](https://msdn.microsoft.com/en-us/library/bb491124.aspx) betrieben.
Jede neue Version stellt also eine Ausweitung (expand) (der unterstützten Versionen) dar.
Gleichzeitig bedeutet der Betrieb mehrerer Versionen eines Services Zusatzkosten bei der Wartung und Weiterentwicklung.
Daher gibt es häufig die Regel, dann nur wenige Versionen unterstützt werden (die letzten n Versionen).
Hier kommt der zweite Aspekt zu tragen. Man wird die Anzahl der unterstützten Versionen nicht beliebig wachsen lassen, sondern veraltete
Versionen werden entfernt. Hier wird also wieder bewusst die Unterstützung verkleinert (contract).

## [Blue / Green Deployments](http://martinfowler.com/bliki/BlueGreenDeployment.html)

Anstatt, dass man das Deployment einer neuen Softwareversion in der bestehenden Umgebung (Blue Environment) managed, wird eine neue Umgebung (Green Environment) daneben aufgebaut (Expand).
In diesem Bereich kann die Anwendung getestet sogar getestet werden. Wenn die Tests erfolgreich sind, dann wird der Router umgestellt, dass
er Anfragen nicht mehr auf die blaue, sondern auf die grüne Umgebung weiterleitet.
Anschließend kann die blaue Umgebung gelöscht werden (contract). Häufiger ist allerdings, dass diese Umgebung zur Staging Umgebung für das
nächste Release wird.
Eine kurze Zeit mehr VMs bereitstellen ist insbesondere in einer Cloudumgebung kein großes Problem mehr, außer man räumt die Zusatzressourcen nicht mehr ab.

## Blue / Green Deployments Datenbanken

Im Rahmen des Blue / Green Deployments stellen Datenbanken eine besondere Herausforderung dar.
Aber auch diese bekommt man mit Expand and Contract in den Griff.

* Ändere das Schema so, dass alte und neue Version der Anwendung unterstützt werden (Expand)
* Deploye die neue Version der Software
* Und entferne die Unterstützung für die alte Version der Anwendung (Collapse)

Diese wenigen Beispiele haben etwas gemeinsam, dass ich in dem Muster "Expand-and-Collapse" zusammenfasse.

## Expand - Collapse

Dieses Pattern scheint immer dann anwendbar zu sein, wenn der Versionsübergang eines Dienstes gemanaged werden muss.
Statt diesen Übergang hart an einem Zeitpunkt zu managen, werden mehrere Versionen eines Dienstes eine zeitlang parallel betrieben.
Dies erhöht die Kosten für den Betrieb, Wartung und Weiterentwicklung des Dienstes. Diese höhren Kosten sind durch geringere Ausfallzeiten,
geringeren Abstimmbedarf und ein geringeres Risiko gerechtfertigt.
Damit die Kosten nicht beliebig wachsen, muss die Anzahl der Versionen eines Dienstes gemanaged werden. Die Unterstützung für alte Versionen
muss aktiv entfernt werden.
Der letzte Schritt ist häufig sehr ersichtlich, wenn es sich um Zusatzkosten für zusätzliche virtuelle Maschinen handelt. Dem Management sind diese Kosten aber ggf. nicht so offensichtlich, wenn im Code mehrere Versionen einer Schnittstelle unterstützt werden.
Häufig heißt es ja "es funktioniert doch und Software erzeugt keine weiteren Kosten wenn sie erstellt ist, warum also entfernen?".

So, dass wars für dieses mal.
Kennt jemand noch andere Beispiele für dieses Meta-Pattern, oder weiß, wo es eine solche Sammlung mit Meta-Pattern schon gibt?

Als nächstes schauen wir uns noch das Meta-Pattern "Zeitliche Entkopplung" an.
