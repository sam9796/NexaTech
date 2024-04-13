const mongoose = require('mongoose');


const participantSchema=mongoose.Schema({
    //firstName of user
    name:{
        type:String,
    },
    //email of the user
       email:{
           type:String,
       },
       description:{
        type:String,
       },

})

const Contact = mongoose.model('Contact', participantSchema);
module.exports = Contact;