const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const note_schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  userId: String,
  date: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Note", note_schema);
