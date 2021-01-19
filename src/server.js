const http = require('http');
const app = require("./app");
const db = require("./database/index.js");

try {
    db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

const port = process.env.PORT || 8080;

const server = http.createServer(app);

server.listen(port);