const mongoose = require('mongoose');



const quesSchema=mongoose.Schema({
    quizId:{
        type:String,
    },
    eventId:{
        type:String,
    },
    options:{
        type:[String],
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    resp:{
        type:String,
        required:true,
    },
    count:{
        type:[Number],
        default:[]
    }
})

const Question=mongoose.model('questions',quesSchema);
module.exports=Question