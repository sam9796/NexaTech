const mongoose = require('mongoose');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
       otp:{
        type:String,
       }

})

const Participant = mongoose.model('clients', participantSchema);
module.exports = Participant;