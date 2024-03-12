const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const Participant = require("./Model/Register.model.js");
const User = require("./Model/User.model.js");
const bcrypt=require('bcryptjs')
const { v4: uuidv4 } = require('uuid');
const app=express()
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch((err) => {
    console.log(err);
  });


app.post('/register',async (req,res)=>{
    const {firstName,lastName,mail,contact}=req.body
    try{

        const register=await Participant.findOne({email:mail})
        if(register){
            return res.status(500).json({success:false,msg:'this email already exist'});
        }
        else {
                    const newParticipant=await Participant.create({
                        firstName:firstName,
                        lastName:lastName,
                        email:mail,
                        contact:contact,
                    })
                    if(newParticipant){
                        const data = {
                            user: {
                              id: mail,
                            },
                          };
                          let authtoken = jwt.sign(data, "Shubham@#$%^Jha#$%^");
                        return res.status(200).json({success:true,token:authtoken})
                    }
                    else {
                        return res.status(400).json({success:false,msg:'Unable to register the participant'})
                    }
    }
    }catch(error){
        return res.status(400).json({success:false,msg:'Unable to register the participant'})
    }
})
app.post('/userRegister',async(req,res)=>{
    const {firstName,lastName,mail,password}=req.body
    try{
        const register=await User.findOne({email:mail})
        if(register){
            return res.status(500).json({success:false,msg:'this email already exist'});
        }
        else {
            bcrypt.genSalt(10,async function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                   if(err)return res.status(400).json({success:true,msg:'unable to register the user'})
                   else {
                    const newParticipant=await User.create({
                        firstName:firstName,
                        lastName:lastName,
                        email:mail,
                        password:hash,
                    })
                    if(newParticipant){
                        const data = {
                            user: {
                              id: mail,
                            },
                          };
                          let authtoken = jwt.sign(data, "Shubham@#$%^Jha#$%^");
                        return res.status(200).json({success:true,token:authtoken})
                    }
                    else {
                        return res.status(400).json({success:false,msg:'Unable to register the user'})
                    }
                }
               });
           });
    }
    }catch(error){
        return res.status(400).json({success:false,msg:'Unable to register the user'})
    }
})

app.post('/login',async(req,res)=>{
    const {mail,password}=req.body
    try{const register=await User.findOne({email:mail})
    if(register){
        bcrypt.compare(password,register.password, (err, isMatch) => { 
            if( err || !isMatch ) { 
                return res.json({success:false,msg:'please enter correct password'})
            }
            else{
                const data = {
                    user: {
                      id: mail,
                    },
                  };
                  let authtoken = jwt.sign(data, "Shubham@#$%^Jha#$%^");
                return res.status(200).json({success:true,token:authtoken})
            } 
    })
}
}
    catch(error){
        return res.json({success:false,msg:'no user with this email id exist'})
    }
})

// app.get('/verify/:token',async (req,res)=>{
//     const uqToken=req.params.token
//     const participant=await Participant.findOne({token:uqToken})
//     if(participant){
//         const participant=await Participant.findOneAndUpdate({
//             email:participant.email
//         },{verify:true});
//         const data = {
//             user: {
//               id: participant.email,
//             },
//           };
//           let authtoken = jwt.sign(data, "Shubham@#$%^Jha#$%^");
//         res.json({success:true,token:authtoken})
//     }else {
//         res.json({success:false,msg:'no user registered with this email id'})
//     }
// })

app.listen(8000,()=>{
    console.log('server listening on port 8000')
})