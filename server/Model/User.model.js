const mongoose = require('mongoose');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const participantSchema=mongoose.Schema({
    //firstName of user
    firstName:{
        type:String,
        required:true
    },
    //lastName of user
    lastName:{
        type:String,
        required:true
    },
    //email of the user
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
       password:{
        type:String,
        required:true
       },

})

const User = mongoose.model('users', participantSchema);
module.exports = User;