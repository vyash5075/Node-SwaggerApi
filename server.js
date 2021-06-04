const express = require("express");
const app = express();
const userList = require("./user");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const list = userList.getUserList();

const swaggerUi = require("swagger-ui-express");
swaggerDocument = require("./swagger.json");

//console.log(list);
app.get("/users", (req, res) => {
  return res.status(200).send({
    success: "true",
    message: "users",
    users: userList.getUserList(),
  });
});

app.get("/", (req, res) => {
  return res.status(200).send({
    success: "true",
    message: "users",
    users: userList,
  });
});

app.post("/addUser", (req, res) => {
  console.log(req.body.isPublic);
  if (!req.body.name) {
    return res.status(400).send({
      success: "false",
      message: "name is required",
    });
  } else if (!req.body.companies) {
    return res.status(400).send({
      success: "false",
      message: "companies is required",
    });
  }

  const user = {
    id: userList.getUserList().length + 1,
    isPublic: req.body.isPublic,
    name: req.body.name,
    companies: req.body.companies,
    books: req.body.books,
  };
  list.push(user);
  return res.status(201).send({
    success: "true",
    message: "user added successfully",
    user,
  });
});

app.put("/updateUser/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedUser = {
    id: id,
    isPublic: req.body.isPublic,
    name: req.body.name,
    companies: req.body.companies,
    books: req.body.books,
  };
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list[i] = updatedUser;
      return res.status(201).send({
        success: "true",
        message: "user added successfully",
        updatedUser,
      });
    }
  }
  return res.status(404).send({
    success: "true",
    message: "error in update",
  });
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list.splice(i, 1);
      return res.status(201).send({
        success: "true",
        message: "user deleted successfully",
        list,
      });
    }
  }
  return res.status(404).send({
    success: "true",
    message: "error in delete",
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log("app listening on port 3000");
});
