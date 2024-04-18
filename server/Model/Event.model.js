const mongoose = require('mongoose');

const eventSchema=mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    eventName:{
        type:String,
        required:true,
    },
    college:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    place:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    participant:{
        type:[String],
    },
    finished:{
        type:Boolean
    },
    quizzes:{
        type:[String]
    }
})

const Event=mongoose.model('events',eventSchema);
module.exports=Event