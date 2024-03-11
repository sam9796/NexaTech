import mongoose from 'mongoose';
const { Schema } = mongoose;

 const eventSchema=new Schema({
    //Title of the event
    title:{
        type:string,
        required:true
    },
    //Date and time of the event
    date:{
        type:Date,
        required:true
    },
    //Little description of the event
    description:{
        type:string
    },
    //coordinators of the event
    coordinator:{
        type:[string]
    },
    //email and phone number for any enquiry
    contact:{
        email:string,
        phone:string
    }
 })

 const questionSchema=new Schema({
    //eventid in which question was asked
    eventId:{
        type:string,
        required:true,
    },
    //question description
    description:{
        type:string,
        required:true
    }
 })

 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 const participantSchema=new Schema({
    //eventId for which participant has registered
        eventId:{
            type:string,
            required:true
        },
        //firstName of participant
        firstName:{
            type:string,
            required:true
        },
        //middleName of participant
        middleName:{
            type:string
        },
        //lastName of participant
        lastName:{
            type:string,
            required:true
        },
        //email of the participant
        email:{
            type:string,
            unique:true,
            required:true,
            lowercase:true,
            validate:{
                validator: function(email) {
                    return emailRegex.test(email);
                  },
            }
        },
        //gender of the participant
        gender:{
            type:boolean,
            required:true
        }

 })

 const chatSchema=new Schema({
    //event to which chat belongs
    eventId:{
        type:string,
        required:true,
    },
    //person who has written the chat
    participantId:{
        type:string,
        required:true,
    },
    //person to whom chat was written 
    secondPersonId:{
        type:string,
        required:true,
    },
    //any chat ahead so that we can create like a chain and make a proper flow of the chat
    parentChatId:{
        type:string,
        required:true,
    }
 })

 const resultSchema=new Schema({
    //event to which result belongs
    eventId:{
        type:string,
        required:string,
    },
    //person to whom result belongs
    participantId:{
        type:string,
        required:string,
    },
    //no of questions he answered correctly 
    noOfCorrect:{
        type:number,
        required:true
    }
 })

 const paymentSchema=new Schema({
    //candidate who is making payment, his email id required
        candidateEmail:{
            type:string,
            required:true,
            lowercase:true,
            validate:{
                validator: function(email) {
                    return emailRegex.test(email);
                  },
            }
        },
        //whether the payment was succesful or not
        paymentStatus:{
            type:boolean,
            required:true,

        },
        //other payment details which we fetch when a razorpay payment is made
        razorpay_order_id: {
            type: String,
            required: true,
          },
          razorpay_payment_id: {
            type: String,
            required: true,
          },
          razorpay_signature: {
            type: String,
            required: true,
          },
 })


