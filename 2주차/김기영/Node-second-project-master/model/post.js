const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  create_date: {
    type: Date,
    default: new Date(),
  },
  modify_date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("post", postSchema);
