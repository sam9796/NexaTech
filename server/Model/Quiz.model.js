const mongoose = require('mongoose');


const eventSchema=mongoose.Schema({
    name:{
        type:String,
    },
    timer:{
        type:String
    },
    quiz:{
        type:Boolean
    },
    description:{
        type:String
    }
    
})

const Quiz=mongoose.model('quiz',eventSchema);
module.exports=Quiz