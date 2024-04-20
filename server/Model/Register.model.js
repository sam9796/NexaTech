const mongoose = require('mongoose');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const eventSchema=mongoose.Schema({
    eventId:{
        type:String,
    },
    quesId:[String],
    quesCheck:[Boolean],
    options: [{
        finished:{type:Boolean},
        selected:{type:String},
    }],
    finshed:{type:Boolean,
    default:false},
    lastDate:{
        type:Date,
    }
})

const participantSchema=mongoose.Schema({
       //firstName of participant
       firstName:{
           type:String,
           required:true
       },
       //lastName of participant
       lastName:{
           type:String,
           required:true
       },
       //email of the participant
       email:{
           type:String,
       },
       contact:{
        type:String,
       },
       verify:{
        type:Boolean,
       },
       events:[eventSchema],
       otp:{
        type:String,
       }

})

const Participant = mongoose.model('clients', participantSchema);
module.exports = Participant;