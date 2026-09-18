const mongoose = require("mongoose");

const urlschema = new mongoose.Schema({
  longurl: {
    type: String,
    required: true,
  },
  shortid: {
    type: String,
    required: true,
    unique: true
  },
  clickcount: {
    type: Number,
    default: 0,
  },
  createdat: {
    type: Date,
    default: Date.now,
  },
  createdby:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
  },
});

const url = mongoose.model("url", urlschema);

module.exports = url;
