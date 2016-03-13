---
layout: post
title: "HAProxy, Docker und Syslog"
date: "2016-02-17"
authors:
  - richard.attermeyer
tags:
  - "haproxy"
  - "logmanagement"
categories:
  - "devops"
---
## HAProxy Logging
HAProxy schreibt seine Logs anders als viele andere Anwendungen nicht in eine Datei, sondern
standardmäßig an einen syslog server.
Anstatt viele Worte zu verlieren, was man einrichten muss, damit auf einem Ubuntu Host der haproxy in eine Datei loggt, sei hier ein ansible playbook dargestellt.

     - name: install syslog-ng
       apt: name={{item}} install_recommends=true
       with_items:
         - syslog-ng-core
         - syslog-ng-mod-sql
         - syslog-ng-mod-mongodb
         - syslog-ng-mod-json
     - name: configure syslog udp port
       lineinfile: dest=/etc/syslog-ng/syslog-ng.conf line="{{item}}"
       with_items:
         - "source s_udp { udp(port(514)); };"
         - "log { source(s_udp); filter(f_local); destination(d_syslog); };"
       notify:
         - restart syslog-ng
     - include: docker_container.yml
       vars:
         image: "{{haproxy_docker_image}}"
         name: haproxy-lb
         ports:
           - "443:443"
         env:
           backends: "{{apache_host}}:{{apache_port}}"
           SYSLOG_ADDRESS: "{{dev_box_ip}}"

 Das Playbook installiert syslog-ng auf dem host und richtet einen syslog port ein. Alle Nachrichten an den Port 514 werden dann in die syslog datei geschrieben.

 Dieser Port wird dann als Syslog Adresse dem Dockerimage mitgegeben.   
