# muuvy frontend app

[![Build Status](https://travis-ci.com/muuvy/app-frontend.svg?branch=dev)](https://travis-ci.com/muuvy/app-frontend) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=muuvy_app-frontend&metric=alert_status)](https://sonarcloud.io/dashboard?id=muuvy_app-frontend)

## Table of Contents

- Introduction
- Architecture
- Setup
- Tests
- About

### Setup

To compile the entire project, run "mvn install".

To run the application, run "mvn jetty:run" and open http://localhost:8080/ .

Debugging client side code

run "mvn vaadin:run-codeserver" on a separate console while the application is running
activate Super Dev Mode in the debug window of the application
To produce a deployable production mode WAR:

change productionMode to true in the servlet class configuration (nested in the UI class)
run "mvn clean package"
test the war file with "mvn jetty:run-war"
