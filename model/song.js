const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("song", songSchema);
