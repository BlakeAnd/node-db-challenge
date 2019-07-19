const express = require('express');
//const helmet = require('helmet');

const server = express();

//server.use(helmet());
server.use(express.json());

const db = require('./data/db-config.js');

server.post("/api/projects", (req, res) => {
  const project = req.body;
  db("projects")
  .insert(project, "id")
  .then(project => {
    res.status(200).json(project);
  })
  .catch(error => {
    res.status(500).json({error: error.message})
  })
})

module.exports = server;