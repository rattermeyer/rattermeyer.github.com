---
layout: post
title: "Businesstreiber für Microservices"
date: "2016-01-03 11:17:57 +0100"
---

(--- Early DRAFT ---)

Microservices sind trendy. Aber das allein reicht nicht dafür aus, ein
bestimmtes Architekturmuster zu verwenden. Es müssen auch wichtige
Businesstreiber vorhanden sein für die Microservices eine geeignete
Lösungsstrategie sind.

Was sind denn dann solche Businesstreiber? Vielleicht kann man das
einfacher analysieren, wenn man von den Eigenschaften einer
Microservicesarchitektur sich dem ganzen nähert.

Vorteile von Microservices

* Neue Technologien lassen sich leicht ausprobieren und adaptieren
* Reduzierung des Time-to-Markets für neue Features
* Der Technologiestack kann nach und nach modernisieriert werden
* Fehler in einem Service haben nur geringen Einfluss auf andere Services

Herausforderungen

* Möglicherweise viele unterschiedliche Technologien (Heterogenität)
* Abstimmung und Koordination zwischen Services aufwändig
* Jedes Team benötigt Wissen über eigentlich querschnittliche Themen

Es gibt eine Menge Kompromisse, die Netflix eingegangen ist und die
typisch für Microservices-Architekturen sind.

* Technologieentscheidungen auf Teamebene und Experimente zur besseren
Erreichung qualitativer Ziele sind einer homogenen Landschaft mit hoher
Integrität vorzuziehen
* Die schnelle Erstellung und Auslieferung von Funktionalität ist
wichtiger als gut getestete Lösungen und "Fehlerfreiheit" in Produktion
* Innovationskraft und Wachstum sind sehr wichtige Aspekte der
Softwareentwicklung. Kontrolle, Planungsfähigkeit und Statusaussagen
gegenüber dem Management sind diesen Aspekten klar untergeordnet
* Redundante Entwicklungstätigkeiten und geringe
Wiederverwendungsmöglichkeiten sind jederzeit in Ordnung, um herausragende
Qualität und entsprechende Marktvorteile zu sichern
* Es ist wichtig auf schwankende Systemlast, sowie Hard- und
Softwarefehler zu reagieren ohne Verfügbarkeit einzubüßen. Kosten für
Redundanzen und etwaige Inkonsistenzen sind geringe Opfer
* Die langfristige Brauchbarkeit und zeitgemäße Ausprägung der Lösung
rechtfertigt höhere initiale Aufwände für Framework- und
Infrastrukturkomponenten

Damit ergeben sich eine Menge von Businesstreibern:

* Schnelle Erstellung von Funktionalität ist ein Wettbewerbsvorteil, sogar, wenn diese nicht immer fehlerfrei ist.
* Wachstum ist wichtiger als Kostenkontrolle
* Bedienen einer schwankenden Nachfrage ist wichtig




