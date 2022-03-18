const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({

    _id: Number,
    title:{ type:String,required:true},
    subtitle: { type:String,required:true},
    image:{ type:String,required:true},
    description:{ type:String,required:true},
    date:{ type:String,required:true},
    mainspeaker: {
        type: String,
        ref: "speakers",
        required:true
    },

    visitors: [   
        {
            required:false,
          visitor_id: {
            type: mongoose.Types.ObjectId,
            ref: "user",
          },
    
        },
      ],
})
schema.plugin(AutoIncrement, { id: "event_id" });
module.exports = mongoose.model("event", schema);
