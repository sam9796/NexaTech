const mongoose = require('mongoose');


const eventSchema=mongoose.Schema({
    name:{
        type:String,
    },
    timer:{
        type:String
    }
    
})

const Quiz=mongoose.model('quiz',eventSchema);
module.exports=Quiz