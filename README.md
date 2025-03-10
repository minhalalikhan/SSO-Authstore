# SSO Login AuthStore App1

## Introduction

This app is a demo AuthStore app which is used to demonstrate SSO login functionality. This app works by acting as the single source of truth for the [SSO-App1](https://github.com/minhalalikhan/SSO-app1) app which is the demo client app

## Demo
- [AuthStore](https://sso-authstore.vercel.app/)
- [App1](https://sso-app1.vercel.app/)


## How to use

- clone this repo
- clone the App1 repo
-  add relevant env variables on both projects
-   npm run dev command to start each of them
-   Visit App1
-   click on SignIn with AuthStore
-   Login to AuthStore if not already signedIn

## Env File

```
NEXTAUTH_SECRET='any secret key here'

```
