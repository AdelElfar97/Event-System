const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
     _id: Number,
    fullname: String,
    password: String,
    email: {
        type:String,
    },
})


schema.plugin(AutoIncrement,{id:"student_id"});
module.exports = mongoose.model("student", schema);
