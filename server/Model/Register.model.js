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
           unique:true,
           required:true,
           lowercase:true,
           validate:{
               validator: function(email) {
                   return emailRegex.test(email);
                 },
           }
       },
       contact:{
        type:String,
        required:true
       },

})

const Participant = mongoose.model('clients', participantSchema);
module.exports = Participant;