---
layout: post
title: "Das Expand-and-Contract Meta Pattern"
date: "2016-09-15"
authors:
  - richard.attermeyer
categories:
  - Software Architektur
tags:
  - DevOps
  - Continuous Delivery
  - Configuration-Management
  - Software Architektur
---

Wenn es verhältnismäßig wenig kostet zusätzliche Server zu deployen und später die Ressourcen wieder freizugeben, dann vereinfachen sich Deployments von neuen Versionen.
Teuer wird es nur, wenn man die Ressourcen nicht mehr freigibt. Wir werden weiter sehen, dass dieses Muster auch für "klassische" Projekte wichtig ist.

## Zero-Downtime Deployments 

Im Rahmen von Continuous Delivery aber auch generell spielt es eine wichtige Rolle, wie man neue oder geänderte Funktionalitäten ohne große Ausfallzeiten in Produktion bekommt.
Aktuell liest man häufig von den Mustern

* Blue / Green Deployments
* Rolling Updates
* Feature Toggles

Es gibt aber auch noch ein weiteres Muster:

## Expand and Contract



