# Ack-People (social network MERNG app)
## Overview:

This project is the server side of a posting based social network what allow us register, create posts, like and comment posts from other user as well. 

![ack-people](https://user-images.githubusercontent.com/85290842/195309368-55aa57f3-016a-4762-92cf-49adecd75b74.png)

## Run online:
https://ack-people-client.vercel.app/

## Project Description:
#### Frontend and Routing:
I use React With Express 
#### Backend:
Nodejs Obviously
#### Database CRUD:
I chose MongoDB and GraphQL with Apollo Server
#### Deploy on Vercel:
Although Vercel is designed for Next.js, I adapted the project to be able to be deployed on that platform.

## How install and run:
First clone the client and server repos:
```bash
$ git clone https://github.com/juliancabmar/ack-people_client
$ git clone https://github.com/juliancabmar/ack-people_server
```
Install the client dependencies:
```bash
$ cd ./ack-people_client
$ npm install --legacy-peer-deps #(for avoid dependency issues)
```
Install the server dependencies:
```bash
$ cd ./ack-people_server
$ npm install --legacy-peer-deps #(for avoid dependency issues)
```
In the server path create a .env file and add this:
```bash
MONGODB = <Your collection string authorization>

SECRET_KEY = <Some password>
```
Run the server:
```bash
$ npm start
```
Run the client:
```bash
$ cd ./ack-people_client
$ npm start
```
Finally open [http://localhost:3000](http://localhost:3000) in your browser.
