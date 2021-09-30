const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let List = new Schema({
  content: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("List", List);
