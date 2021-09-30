const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let newUser = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("newUser", newUser);
