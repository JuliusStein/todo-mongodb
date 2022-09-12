# todo-mongodb
Assignment 1

A simple todo list application using MongoDB
Implementation of [diogo.fg.pinheiro's tutorial](https://medium.com/@diogo.fg.pinheiro/simple-to-do-list-app-with-node-js-and-mongodb-chapter-2-3780a1c5b039)

## Installation
In order to run this application, you need to have [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/) installed.

After having both installed, you will need to add a `.env` file to the root of the project with the following content:\n
`DB_CONNECT = mongodb+srv://<username>:<password>@<yourDB>.mongodb.net/?retryWrites=true&w=majority`

After this, run `npm start` to start the application. It will be available at `localhost:3000`.