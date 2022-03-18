
const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const schema = new mongoose.Schema({

  _id: Number,
  name: String,
  
  image:String,
  address: String,
  bdate: Date,
  hourRate: Number,
  isMarried: Boolean,
  rating: Number,
});
schema.plugin(AutoIncrement,{id:"speaker_id"});
module.exports = mongoose.model("speaker", schema);
