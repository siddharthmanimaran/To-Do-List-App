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
const user = require("./logIn.model");

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
      res.status(200).json({ newuser: "user added successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ newuser: "adding user failed" });
    });
});

ToDoListRoutes.route("/logIn").post((req, res) => {
  console.log("login--->", req.body);

  newUser.find({ userName: req.body.userName }, function (err, person) {
    console.log("body--->", person);
    if (err) {
      res.status(400).send("service not available");
    }
    if (person.length) {
      const userDetails = person[0];
      bcrypt
        .compare(req.body.password, userDetails.password)
        .then((confirmPassword) => {
          console.log("Confirm passed result--->", confirmPassword);
          if (confirmPassword) {
            res.json({
              success: true,
              userDetails: userDetails,
            });
          } else {
            res.json({
              success: false,
              message: "Invalid password",
            });
          }
        })
        .catch((err) => {
          console.log("Error while password check");
        });
    } else {
      res.json({
        success: false,
        message: "User not found",
      });
    }
  });
});

app.use("/ToDoList", ToDoListRoutes);
app.use("/signUp", ToDoListRoutes);
app.use("/logIn", ToDoListRoutes);
app.listen(PORT, console.log(`Server started at port ${PORT}`));
