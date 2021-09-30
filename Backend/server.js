const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const ToDoListRoutes = express.Router();
const bcrypt = require("bcrypt");

const List = require("./ToDoList.model");
const newUser = require("./SignUp.model");

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/ToDoList", {
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

ToDoListRoutes.post("/signUp", async (req, res) => {
  console.log("signUp--->", req.body);
  const salt = await bcrypt.genSalt(10);

  let newuser = new newUser();
  newuser.firstName = req.body.firstName;
  newuser.lastName = req.body.lastName;
  newuser.userName = req.body.userName;
  newuser.email = req.body.email;
  newuser.password = req.body.password;
  newuser.password = await bcrypt.hash(newuser.password, salt);
  newuser
    .save()
    .then((x) => {
      console.log("added success");
      res.status(200).json({ newuser: "user added successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ newuser: "adding user failed" });
    });
});

app.use("/signUp", ToDoListRoutes);
// app.use("/logIn", ToDoListRoutes);
app.listen(PORT, console.log(`Server started at port ${PORT}`));
