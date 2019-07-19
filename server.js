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
server.post("/api/actions/:id", (req, res) => {
  const {action_description} = req.body;
  const {action_notes} = req.body;
  const {action_completed} = req.body;
  const project_id = req.params.id;
  // console.log("action:", action);
  // console.log("project id:", project_id);
  db("actions")
  .insert({action_description, action_notes, action_completed, project_id}, "id")
  .then(action => {
    res.status(200).json(action);
  })
  .catch(error => {
    res.status(500).json({error: error.message})
  })
})
server.get("/api/projects/:id", (req, res) => {
  const id = req.params.id;

  db("projects")
  .leftJoin("actions", "projects.id", "actions.project_id")
  .where({project_id: id}, id)
  .select()
  .then(project => {
    res.status(200).json(project);
  })
  .catch(error => {
    res.status(500).json({error: error.message})
  })
})
server.delete("/api/projects/:id", (req, res) => {
  const id = req.params.id;
  db("projects")
  .where({id})
  .del()
  .then(project => {
    res.status(200).json(project);
  })
  .catch(error => {
    res.status(500).json({error: error.message})
  })
})


module.exports = server;