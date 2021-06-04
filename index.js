const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const port = 3080;
const tsks = [
  {
    id: 1,
    task: "task1",
    assignee: "assignee1000",
    status: "completed",
  },
  {
    id: 2,
    task: "task2",
    assignee: "assignee1001",
    status: "completed",
  },

  {
    id: 3,
    task: "task3",
    assignee: "assignee1002",
    status: "completed",
  },
  {
    id: 4,
    task: "task4",
    assignee: "assignee1000",
    status: "completed",
  },
];

app.use(bodyParser.json());

app.get("/api/todos", (req, res) => {
  console.log("api/todos called!!!");
  res.json(tasks);
});

app.post("/api/todo", (req, res) => {
  const task = req.body.task;
  tasks.push(task);
  res.json(tasks);
});

app.delete("/api/todo/:id", (req, res) => {
  console.log("Id to delete:::::", req.params.id);
  tasks = tasks.filter((task) => task.id != req.params.id);
  res.json(tasks);
});
app.put("/api/todo", (req, res) => {
  const taskToUpdate = req.body.task;
  tasks = tasks.map((task) => {
    if (task.id === taskToUpdate.id) task = taskToUpdate;
    return task;
  });
  res.json(tasks);
});

app.get("/", (req, res) => {
  res.send(`<h1>API Running on port ${port}</h1>`);
});

app.listen(port, () => {
  console.log("I am ready to listen you");
});
