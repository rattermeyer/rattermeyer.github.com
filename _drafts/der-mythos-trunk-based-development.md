---
layout: post
title: "Der Mythos der trunk-basierten Entwicklung"
authors:
  - richard.attermeyer
categories:
  - Continuous Delivery
tags:
  - DevOps
  - Continuous Delivery
  - Configuration-Management
  - Source Control
---
## Einleitung
Langlebige Branches sind out - es lebe das Trunk-Based Development. So oder ähnlich lautet ein Mantra im Bereich Continuous Delivery.
Und ich glaube zu recht. [Paul Hammant][hamm2013] hat sehr gut erklärt, was trunk basierte Entwicklung ist.
Diese Branching Modell wird aus verschiedenen Gründen gewählt.

### Merge Hell
Lang lebende Entwicklungsbranches divergieren schnell und wenn sie wieder mit dem trunk gemerged werden sollen, dann kommt es zur Merge Hölle durch viele Konflikte die aufgelöst werden müssen.

### Keine verlässlichen Fortschrittsaussagen
In einem agilen Entwicklungsprozess können zwar alle Stories bearbeitet sein, aber ob das auch zu einem auslieferbaren Produktinkrement im Sprint führt ist nicht klar.
Ich habe schon in vielen Sprints erlebt, dass zwei Tage vor Sprintende die Entwickler sagten: "Wir müssen nur noch mergen". Und der Product Owner zitterte, ob überhaupt etwas fertig war, denn die Entwickler waren die letzten zwei Tage des Sprints mit dem Zusammenführen der Branches beschäftigt.

## Ausweg
Ein vorgeschlagener Ausweg davon ist, dass die Entwicklung hauptsächlich auf dem Hauptzweig (trunk) stattfinden soll.

Viele Entwickler werden einwenden, dass es sogenannte breaking-changes gibt, die dazu führen, dass der Trunk über lange Zeit nicht mehr erfolgreich bauen kann, etwa wenn ein querschnittliches Konzept geändert wird.

Auch dazu gibt es schon erprobte Muster, wie

* [Branch-by-Abstraction](http://paulhammant.com/2013/04/05/what-is-trunk-based-development/)
* [Feature Toggles](http://martinfowler.com/bliki/FeatureToggle.html)

Dann ist ja alles gut, oder?

## Probleme
Direkt auf den Trunk commited wird, besteht eine große Gefahr, dass der Trunk mehr rot als grün ist. Dieses Problem verschärft sich im Umfeld von Continuous Delivery. Im Rahmen einer Pipeline werden verschiedene Tests durchgeführt. Unit Tests laufen schnell und die kann jeder Entwickler noch einfach auf seinem Entwicklungsrechner durchführen, aber schon bei Integrationstests sieht das anders aus. Selbst bei einem mittelgroßen Projekt laufen Integrations- und Akzeptanztests schnell 30 Minuten und länger.

## Lösungsmöglichkeiten
Aus meiner Erfahrung wird das Muster "Entwicklung auf dem Hauptzweig" häufig falsch verstanden. Schon [Paul Hammant][hamm2013] schreibt in einem kleinen Satz:

> "More sophisticated companies will use pre-commit verifications."

Die Motivation für Hauptzweig basierte Entwicklung liegt darin, lang laufende Branches zu vermeiden, häufig zu integrieren und Änderungen im Hauptzweig schnell in Branches zu integrieren, an denen aktiv entwickelt wird.
Pre-Commit Verification kann unterschiedliche Gesichter haben. Viele Entwickler haben vielleicht schon von [Gerrit][gerrit] gehört, einem Code Review System. Gerrit ermöglicht vor einem Push das Review von Codeänderungen und das sowohl durch Kollegen, wie auch durch Merge des Trunks mit dem Entwicklungsbranch und bauen der Sourcen auf einem Build Server wie Jenkins.  
Dass viele Projekte den Aufwand für ein manuelles Review scheuen, sollte aber nicht
davon abhalten trotzdem ein automatisiertes Review durchzuführen. Dies ist auch realisierbar über Jenkins Boardmittel, indem man eine Pre-Commit Pipeline einrichtet.

## Weitere Informationen

[hamm2013]: http://paulhammant.com/2013/04/05/what-is-trunk-based-development/
[gerrit]: https://www.gerritcodereview.com/
