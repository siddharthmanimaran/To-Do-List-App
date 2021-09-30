const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", user);
