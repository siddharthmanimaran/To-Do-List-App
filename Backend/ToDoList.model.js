const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let todolist = new Schema({
  list: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("todolist", todolist);
