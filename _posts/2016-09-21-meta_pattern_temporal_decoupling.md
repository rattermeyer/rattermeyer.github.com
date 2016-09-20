---
layout: post
title: "Meta Pattern: Temporal Decoupling"
date: "2016-09-20"
authors:
  - richard.attermeyer
categories:
  - Softwarearchitektur
tags:
  - Continuous Delivery
  - Softwarearchitektur
---

Die zeitliche Entkopplung von Aktivitäten spielt in vielen Bereichen der Softwarearchitektur eine wichtige Rolle, um zuverlässige und belastbare (resiliente) Systeme zu entwerfen.

Auch hier einige Beispiele

## Asynchrones Messaging
Dies ist wohl das bekannteste Muster einer zeitlichen Entkopplung. Synchrones Messaging koppelt den aufrufenden und den aufgerufenen Dienst zeitlich sehr eng aneinander. Die Performance des aufrufenden Services hängt von der Performance und der Verfügbarkeit des aufgerufenen Dienstes ab. Durch Nutzung eines zwischengeschaltete Pufferns (in der Regel in Form einer Messaging Middleware) können der Produzent und Konsument unabhängig voneinander agieren.

## Feature Toggles
[Feature Toggles](http://martinfowler.com/articles/feature-toggles.html) entkoppeln im Rahmen des Continuous Delivery / Deployments die Aktivitäten Deployment und Inbetriebnahme voneinander. Dies ermöglicht es eine neue Funktionalität schnell in Produktion zu bringen.
Das Feature Toggle wird dann für einen bestimmten Prozentsatz der Anfragen eingeschaltet. Und kann dann auch ggf. wieder abgeschaltet werden, wenn das Experiment nicht erfolgreich war.
Gleichzeitig sind Feature Toggles ein Beispiel für Expand-and-Collapse. Jedes neue Feature Toggle stellt eine Art technischer Schuld dar.
Es zu managen oder gar Kombinationen von eingeschalteten Feature Toggeln zu testen kann sehr kostenintensiv sein. Daher müssen eingeführte Toggles auch so bald wie möglich wieder aus dem Code entfernt werden.

## Management von umgebungsabhängigen Applikationseinstellungen
Wenn eine Anwendung durch die verschiedenen Teststufen einer Delivery Pipeline wandert, dann müssen die umgebungsspezifischen Anpassungen
immer auch zu der entsprechenden Version der Anwendung passen.
Dies kann man zum einen dadurch erreichen, dass zum Zeitpunkt des Deployments der Anwendung auch die Umgebungsvariablen aktualisiert werden.
Diese Einstellungen sollten außerhalb der Anwendung abglegt sein (Properties File, K/V Store wie Eureka oder Consul, ...).
Aber wenn immer nur der aktuelle Zustand dieser Umgebungsvariablen gemanaged wird, dann kann die Umgebung nicht schon "vorbereitet" werden.
Falls dann aber "alte" Versionen wieder hergestellt werden müssen (etwa bei einem Hotfix), dann müssen auch die dazu passenden Einstellungen wiederhergestellt werden.
Um hier die zeitliche Kopplung aufzuheben kann etwa im Consul eine Kombination aus Tagversion der Anwendung + Umgebung genutzt werden, um die Schlüssel abzulegen.
Insgesamt zeigt sich, dass dieses vorgehen robuster ist, als die zeitliche Kopplung. Sie erlaubt auch im Vorfeld nochmal ein Review
der Einstellungen.
