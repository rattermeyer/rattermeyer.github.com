---
layout: post
title: "Microservices und die Emergent Design Krise"
date: "2017-08-17 15:44:58 +0200"
authors:
  - richard.attermeyer
categories:
  - Softwarearchitektur
tags:
  - Softwarearchitektur
  - Microservices
---
Eines der Prinzipien bei agiler Softwareentwicklung ist es Design Entscheidungen möglichst spät zu treffen (Last Responsible Moment).
Es wird nicht vorgeschlagen ein Design für ein Zielsystem zu entwerfen, da der Scope bei agilen Projekten die veränderliche Größe ist.
Ein Zielsystem ist also häufig gar nicht zu definieren. Gleichfalls wird der Softwarenticklungsprozess als Lernprozess aufgefasst.
Je mehr man über eine Domäne versteht, desto besser kann ein passendes Design erstellt werden.
Dies wird möglich, da Refactoring eines der typischen Engineering Praktiken ist, welche in agilen Teams angewendet werden.

## Refactoring Voraussetzungen
[Refactoring](https://refactoring.com/) von Source Code ist natürlich auch ohne die Unterstützung von IDEs möglich, aber ich bin der Meinung, dass gerade der Einsatz von IDEs mit Ihrer Refactoring Unterstützung bei typisierten Sprachen zur Akzeptanz und Verbreitung
beigetragen haben, wahrscheinlich mehr noch als Test Driven Development.
Ein weiterer Grund ist, dass der Source Code eines Systems über mehrere Domänen hinweg in einem großen (Java-) Monolithen vorhanden war.
So kann ein Refactoring-Pattern (Umbenennung von Variablen, Änderung von Methodensignaturen, etc.) einfach durchgeführt werden.
Einfach heißt auch aus Geschäftssicht: ohne hohe Kosten. In der Tat betrachte ich Refactorings, die durch IDE Unterstützung durchgeführt
werden können und die Verständlichkeit des Source Codes verbessern als eine handwerkliche Sorgfaltspflicht eines Entwicklers und nicht
als etwas separat zu bepreisendes. Und damit dies funktioniert, ist die Erstellung von Unit- und Integrationstests ebenfalls eine Entwicklerpflicht.

## Refactoring in verteilten Systemen
Wenn wir ein verteiltes System, etwa entsprechend des Microservices Architekturstils entwickeln, dann schneiden wir unser Gesamtsystem in
kleine Teile und errichten harte Remote-Call Grenzen.
Grenzen werden über verschiedene Transportprotokolle (HTTP, AMQP, gRPC), verschiedene Serialisierungsmechanismen (JSON, Protobuf, XML) und verschiedene Mappings realisiert. Gleichzeitig werden diese Schnittstellen über Consumer Driven Tests abgesichert, die häufig aufwändiger als Unit Tests zu erstellen, zu pflegen und zu ändern sind.
Die Zerlegung in Microservices stellt also eine wesentliche Architekturentscheidung dar, die nur schwer zu ändern ist, denn, wie C. Verhoef[1], u.a. schreiben: "The software architecture of deployed software is determined by those aspects that are the hardest to change."

## Auswirkung auf den Last Responsible Moment
Architekturentscheidungen konnten in eher monolithischen Systemen weiter in die Entwicklung verschoben werden. Im Extremfall so weit,
dass die Architektur sich erst im Rahmen der Entwicklung ergab (auch wenn ich das idR für keinen guten Ansatz halte), zumindest was die
innere Struktur des Monolithen betraf.
Wir müssen uns daher Gedanken machen, wie wir es schaffen können entweder

* den LRM trotzdem weiter rauszuschieben
* oder mit hoher Sicherheit einen Serviceschnitt durchzuführen, der später keine großen Umbaukosten nachzieht

In weiteren Blog Posts werde ich mich diesen beiden Punkten widmen.

[1]: Klusener, Lämmel, Verhoef; Architectural Modifications to Deployed Software, 2004, http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.7.8653&rep=rep1&type=ps
