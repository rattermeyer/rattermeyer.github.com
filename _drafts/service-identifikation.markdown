---
layout: post
title: "Service Identifikation"
---
Nachdem wir in den vorigen Posts gesehen haben, dass wir uns mit dem Thema Komponentenschnitt / Service Identifikation früher Gedanken
machen müssen als bei eher monolithischen Systemen, die agil entwickelt werden, stellt sich die Frage wie wir das machen.

Diese Frage stellt sich gerade mit Hinblick auf die Etablierung einer Microservices Architektur. In diesem Architekturstil gibt es
viel mehr unabhängige Teile, um ein System aufzubauen.

Daher will ich einige Möglichkeiten vorstellen.

## Microservices und der Entwicklungsprozess

Was auffällt, wenn man gängige Quellen (TODO: Liste) zur Einführung von Microservices liest ist, dass sie viel dazu sagen, welche
Eigenschaften ein guter Microservice haben soll. Leider beantworten nur wenige die Frage: Wie kann ich systematisch eine Microservices
Landschaft entwerfen.

Das wesentliche Problem hat Martin Fowler auch schon in seinem Blogpost "[Monolith First](https://martinfowler.com/bliki/MonolithFirst.html)"
aufgeworfen: "... they only work well if you come up with good, stable boundaries between the services". Also wie können wir solche Services
mit stabilen Grenzen entwerfen?
Der Entwurf von Services ist nichts neues und war auch schon im Bereich Service Orintierter Architekturen von zentraler Bedeutung.
Vielleicht sollten wir dann auch dort anfangen und nicht so tun, als ob man im Bereich SOA nichts gelernt hat.
Allerdings werde ich auch auf die anderen Philosophien hinter SOA und Microservices eingehen und damit vielleicht auch einen erweiterten oder geänderten Blick auf die im SOA üblichen Praktiken liefern.

Wir müssen uns also erst einmal überlegen, wie wir zu einem guten Serviceschnitt kommen.

### Domain Decomposition und Business Capabilities

Wie Inge Hanschke in ihrem Buch, Enterprise Architecture Management, schreibt, versteht man im EAM Bereich häufig das Business-Capability-orientierte Management-Prinzip in Business und IT. Business Capabilities (fachliche Funktionen) werden häuig hanand eines funktionalen Referenzmodells abgeleitet. Um diese Ableitung zu vereinfachen empfehlen OPITZ CONSULTING und link consulting in ihrem Whitepaper ["Managing IT Transformation with EA"](http://www.opitz-consulting.com/fileadmin/user_upload/Collaterals/Artikel/whitepaper-it-transformation-with-enterprise-architecture_sicher.pdf) die Verwendung von industrie spezifischen Referenzmodellen.

Solche Referenzmodelle sind etwa als Auswahl:

* [Microsoft Reference Architecture for Banking](https://news.microsoft.com/download/presskits/msfinancial/docs/MIRAB.pdf)
* [Frameworx Business Process Framework (eTOM)](https://www.tmforum.org/business-process-framework/) für den Bereich Communication Service Providers und deren Lieferanten
* [IOT Reference Architecture, Functional Viewpoint](http://www.iiconsortium.org/IIC_PUB_G1_V1.80_2017-01-31.pdf) für den Bereich Internet of Things (IoT)

Aber diese Referenzmodelle sind nur eine Hilfe, um sein eigenes Business zu modellieren. Ein Referenzmodell kann nie einfach übertragen werden. Vielleicht ist das eigene Business anders aufgebaut.

Dieses Vorgehen wird auch als Function Modeling oder Domain Decomposition bezeichnet.
Die Unterschiede zwischen Capabilities, Domains und Functions sind mir bisher nicht wirklich eindeutig klar.

Meine Auffassung ist wie folgt: Business Function und Capability sind für mich synonym. Mehrere Business Capabilities können in eine
Business Domain zusammengefasst werden. Manchmal wird auch die Domäne weiterhin als Capability betrachtet. Es ergibt sich dann eine
rekursive Capability Map.

Eine Capability beschreibt

* was und nicht wie etwas getan wird, etwa: "Rechnungsversand"
* haben ein Ergebnis, etwa "Rechnung wurde versandt"
  * spezifischere Capabilities im hierarchischen Modell haben spezifischere aber durch ihre umfassende Capability (oder Domäne) beschränkte Ergebnisse, etwa "Teilrechnung erstellt", "Schlussrechnung erstellt"

Oracle listet in seinem Practitioner Guide verschiedene Methoden:

* Function Modeling
* Business Entity Analysis
* Business Process Decomposition
* Application Decomposition

| Oracle                   | EAM                          | DDD              | weitere              |
|:-------------------------|:-----------------------------|:-----------------|:---------------------|
| Functional Decomposition | Business Capability Modeling | Strategic Design | Domain Decomposition |
| Semantic Communities     |                              | Bounded Contexts |                      |
| Data Authority           |                              | Aggregate        |                      |

Oracle schreibt zu Semantic Communities: "Services
exposed across semantic communities may suffer from semantic incompatibilities.", also genau die gleiche Bedeutung, wie sie durch
Bounded Contexts ausgedrückt werden. Allerdings ist das auch nichts neues. Eric Evans hat sein Buch "Domain Driven Design" schon 2003
veröffentlicht.

Es ist daher trotzdem erstaunlich, dass im SOA Umfeld eine großer Wert auf die Festlegung eines Canonical Data Models gelegt wurde.
Dies hat sicherlich mit der unterschiedlichen Philosophie und Abstammung / Verankerung von SOA Projekten im Unternehmen zu tun und der Bedeutung und Positionierung eines Enterprise Service Buses zu tun.

* Business Process Decomposition
  * Identify Business Processes
    * Top Down
    * Bottom Up
      * (Event Storming)

* Domain Decomposition / Business Function Model / Business Capability
  * Reference Architectures -> etom / Tam, microsoft

Capability Heat Map (Light EAM) --> Core Domain / Supporting Domain / General Domain

EAM: Top Down --> IT Zielbild --> IT Umsetzung planen --> IT-Umsetzung steuern
* Application Analysis
  * Process Mining

## Referenzen

OPITZ CONSULTING u.a., Managing IT Transformation with EA, http://www.opitz-consulting.com/fileadmin/user_upload/Collaterals/Artikel/whitepaper-it-transformation-with-enterprise-architecture_sicher.pdf

OPITZ CONSULTING, Whitepaper "Managing IT Transformation with EA",

<a href="">[6]</a>: Sam Newman, Building Microservices

<a href="">[5]</a>: Oracle® Practitioner Guide
[Identifying and Discovering Services](http://www.oracle.com/technetwork/topics/entarch/oracle-pg-soa-ident-svc-r3-2-1561704.pdf)

<a href="">[1]</a>: [Aligning Organisational and Technical Boundaries](https://www.slideshare.net/NickTune/aligning-organisational-technical-boundaries-to-maximise-team-autonomy)

<a href="">[2]</a>: Executing SOA

<a href="">[3]</a>: IBM Redbook, [Microservices from Theory to Practice](https://www.redbooks.ibm.com/redbooks/pdfs/sg248275.pdf)

<a href="">[4]</a>: IBM Redbook, [Patterns: ServiceOriented Architecture and Web Services](http://www.redbooks.ibm.com/redbooks/pdfs/sg246303.pdf)

<a href="">[6]</a>: Sam Newman, Building Microservices

Martin Fowler, [Monolith First](https://martinfowler.com/bliki/MonolithFirst.html)
