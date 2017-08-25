---
layout: post
title: "Verschiebung des LRM beim Service Schnitt"
authors:
  - richard.attermeyer
categories:
  - Softwarearchitektur
tags:
  - Softwarearchitektur
  - Microservices
---
Der Trend hin zu größeren verteilten Systemen (Microservices, SCS oder Mischformen) führt dazu, dass man sich früher Gedanken machen muss,
wie man sein System zerlegt. Aber wie geht man am Besten vor? Was hilft bei einem Serviceschnitt?

## Zutaten für einen Serviceschnitt

Die folgenden Zutaten sind kein Rezeptbuch und definieren nicht unbedingt eine Reihenfolge. Einige Aspekte können parallel erfolgen oder
auch in der Reihenfolge getauscht werden.

Der erste Schritt ist für mich immer eine genaue Kontextabgrenzung: Wofür ist das System zuständig bzw. wofür ist es genau _nicht_  zuständig? Und welche Einflussfaktoren auf die Lösung gibt es, indem sie bestimmte Lösungen explizit ausschließen (Randbedingungen) oder
bestimmte Lösungen gegenüber anderen Lösungen geeigneter erscheinen lassen (Business Treiber und Ziele und daraus abgeleitete Qualitätssziele und -szenarien)

Wichtig ist, dass Sie die unten stehenden Punkte _schriftlich_ festhalten. Ich habe es häufig erlebt, dass sich die beteiligten
Architekten z.B. nicht einig waren über die Zielsetzung der Architekturinitiative. Lassen Sie sich nicht abspeichen mit: Wir wollen eine
Microservices Architektur implementieren. Fragen Sie nach: Was sind die Business Ziele, welche mit dem aktuellen System nicht erreicht
werden? Welche Qualitätsanforderungen haben sich geändert? Und überlegen Sie verschiedene Architekturstile und Handlungsmöglichkeiten,
um die Ziele (wieder) zu erreichen.

### Kontextabgrenzung

Im Rahmen der Kontextabgrenzung kann man auch die Kommunikationsarten und -protokolle bildhaft festhalten.
Aufgelistet werden sollten die Personas, welche mit dem System agieren und genau so die Fremdsysteme.

Es stellt sich die Frage: Soll der Systemkontext technisch oder fachlich dargestellt werden?
Aus meiner Sicht ist der Sytemkontext selber auch zielgruppengerecht darstellbar und sollte sowohl darstellen in welchem fachlichen und technischem Kontext das zu entwickelnde System eingebettet ist.

Aber gerade im Zusammenhang mit anderen Methoden (u.a. Domain Driven Design) plädiere ich hier für eine
fachliche Darstellung. Technische Details wie Protokolle oder Kommunikationsarten (synchron vs. asynchron) sind meistens an dieser
Stelle noch nicht interessant.

### Randbedingungen

Klären Sie Randbedingungen in denen sich die Lösung bewegen muss. Randbedingungen können

* technische (z.B. Programmierprachen, Libraries, Ablaufumgebung)
* organistorisch (z.B. Team, Zeitplan, Vorgehensmodell, Konventionen)
* legislative (Gesetzesvorgaben etc)

sein.

Wenn jemand sagt, dass komplett nach einem Wasserfallmodell entwickelt werden soll mit klarer silomäßiger Trennung zwischen Fach- und IT Seite, überlegen Sie dann nochmal, ob ein Architekturstil, der auf X-funktionale Teams setzt der richtige Ansatz ist.

Bleiben Sie aber hier nicht stehen: Hinterfragen Sie insbesondere organisatorische Randbedingungen. Klären Sie dies auch mit dem "Fachbereich". Verstehen Sie auch, wer der wirkliche Fachbereich ist und nicht der Proxy.

### Business Treiber und Ziele

Das Marktumfeld ist ständiger Veränderung unterworfen. Sind wir aktuell in einer Nische unterwegs? Wollen wir Marktanteile besetzen?
Sind wir in einem Verdrängungswettbewerb? Gibt es neue oder geänderte gesetzliche Rahmenbedingungen?

Das sind ein paar Fragen, welche die Frage beantworten soll: Warum bauen wir dieses System? Warum bauen wir es selber und kaufen es nicht
ein? Bewegen wir uns in einem noch nicht standardisierten Umfeld?

Insbesondere sind aus den Treibern die Ziele abzuleiten (Was wollen wir erreichen?)
Eine Möglichkeit darüber mit den Fachbereichskollegen zu sprechen ist es eine [Impact Map](https://www.impactmapping.org) zu zeichnen.

Impact Mapping ist ein strategisches Planungsinstrument um die einzelnen Aktivitäten mit dem übergreifenden Businesszielen abzugleichen.

Dazu beantwortet es folgende Fragen zu jedem Ziel:

* _Was_ ist das Ziel ("Grow mobile advertising")
* Actor:
  * Wer kann uns dabei helfen ("Super-Fans with mobile devices")
  * Wer sind die Nutzer des Produkts?
  * Wer wird durch das Produkt beeinflusst?
*  Impacts:
  * Wie soll sich das Verhalten der Nutzer ändern? ("Come back more frequently")
  * Wie können die Nutzer uns helfen das Ziel zu erreichen? ("View more ads")
* Deliverables
  * Was können wir als Delivery Team / Organisation tun, um dieses Ziel zu erreichen ("Push updates", "Special offers", "Better pagination")

Die Beispiele sind der [Webseite](https://www.impactmapping.org/drawing.html) und dem [Buch](https://www.amazon.de/Impact-Mapping-Software-Products-Projects/dp/0955683645) entnommen.

Aus den Businesszielen ergeben sich in der Regel auch die wichtigen Qualitätssziele / Qualitätsszenarien

### Qualitätsziele & Qualitätsszenarien

Die Architektur eines Systems versucht die qualitativen Anforderungen eines Systems zu unterstützen.
Qualitatisziele können durch Szenarien verständlich gemacht werden. Gute Szenarien sind für die fachlichen Stakeholder verständlich und für die umsetzenden Entwickler richtungsweisend.

Insbesondere die wichtigsten Businesssziele sollten durch Qualitätssziele und -szenarien verdeutlicht werden.
Szenarien sollten dabei als Kommunikationsmittel verstanden werden, nicht als Abnhamekriteren. Daher ist der Aspekt eines Maßes zwar
wichtig, aber sollte nicht überbewertet werden. Das Antwortmaß kann qualitativ oder auch quantitativ sein. Man sollte sich nur nicht zu lange aufhalten.

Ermitteln kann man die Qualtitätssziele sehr gut im Rahmen eines Anforderungsworkshops. Es ist durchaus sinnvoll, wenn bisher keine
Qualitätssziele definiert wurden, dafür einen eigenen Workshop anzusetzen.

(Quality Attribute Workshop + Iteratives vorgehen)

## Fazit

Wenn Randbedingungen und Qualitätsszenarien nur moderate Anforderungen an Flexibilität, Erweiterbarkeit, einfache Skalierbarkeit, ...
liefern und stattdessen: Starres, aktuell nicht auf Continuous Delivery vorbereitete Organisationsstrukturen (Siloorganisation), dann
stellt sich die Frage, ob Microservices wirklich das Architekturproblem lösen oder deshalb verwendet weil sie hip sind (das macht man jetzt s). Wenn wir auch die Domäne (noch) nicht genau kennen, dann stellt sich ebenfalls die Frage, ob wir das System wirklich sinnvoll schneiden
können. Wer glaubt, dass dieses Problem bei der Migration von Altsystemen nicht existiert, der irrt aber. Gerade dann orientieren sich
aktuelle Prozesse und Organisation häufig an den Beschränkungen des Altsystems. Häufig besteht der Wunsch, hier an der Organisation und den Prozessen etwas zu optimieren. Die Anwender sind aber vielfach gefangene ("Tunnelblick") des bestehenden Systems und es ist sehr schwierig
sie unabhängig vom aktuellen Sytems ihre Domäne zu beschreiben, bzw. darzustellen, wie es sein soll.

Wenn wir also an dieser Stelle die Entscheidung gegen ein stark verteiltes System treffen, dann ist das die auf jeden Fall die günstigere
Alternative, als einen schlechten Serviceschnitt und die Kosten für eine neue Organisationsstruktur in die Hand zu nehmen und später den Schnitt nochmal anzupassen.

Gleichzeitig muss man sich früher mit dem Thema Systemaufteilung beschäftigen, als bei einem monolithischen System.
Der Last Responsible Moment wird früher im Entwicklungsprozess erreicht.
