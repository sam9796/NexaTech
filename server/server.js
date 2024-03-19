const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const Participant = require("./Model/Register.model.js");
const User = require("./Model/User.model.js");
const bcrypt=require('bcryptjs')
const { v4: uuidv4 } = require('uuid');
const app=express()
const jwt = require("jsonwebtoken");
const otpGenerator = require('otp-generator')
const nodemailer=require('nodemailer')
const fetchuser = require("./fetchUser.js");
require("dotenv").config();

app.use(cors());
app.use(express.json());
const accountSid = 'AC5dc360f574765ae0cbe3d52d93e7e60d';
const authToken = '71a7d9fd6df8380ae1ec8b109bd2d8e8';
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch((err) => {
    console.log(err);
  });


app.post('/verifyContact',async (req,res)=>{
 const {firstName,lastName,contact}=req.body;
 const l1=await Participant.findOne({contact:contact})
 if(l1 && l1.verify){
    return res.json({success:false,msg:'Contact already in use'})
 }
const client = require('twilio')(accountSid, authToken);
const otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
await client.messages
    .create({
        body: `Here is your Nexiara Verification code ${otp}`,
        from: '+17867444554',
        to: `+91${contact}`
    })
    .then(async (message)=>{
       if(!l1)await Participant.create({firstName:firstName,lastName:lastName,contact:contact,verify:false,otp:otp});
       else await Participant.findOneAndUpdate({contact:contact},{otp:otp});
       return res.json({success:true,msg:'SMS sent successfully'})
    })
    .catch(error=>{
        return res.json({success:false,msg:'Unable to send the SMS'})
    });
})  
app.post('/verifyContact1',async (req,res)=>{
    const {otp,contact}=req.body;
    const f1=await Participant.findOne({contact:contact})
    if(!f1){
        return res.json({success:false,msg:'Contact not found in the record'})
    }
    else {
        if(f1.otp==otp){
            return res.json({success:true,msg:'OTP verified successfuly'})
        }
        else {
            return res.json({success:false,msg:'Enter correct OTP'})
        }
    }
})
app.post('/verifyMail',async (req,res)=>{
    const {firstName,lastName,contact,email}=req.body;
    const f1=await Participant.findOne({contact:contact})
    if(f1.verify){
        return res.json({success:false,msg:'Mail already in use'})
     }
    if(!f1){
        return res.json({success:false,msg:'Please verify contact first'})
    }
    const otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    let transporter =nodemailer.createTransport({
        service: 'gmail',
        host:'smtp.gmail.com',
  auth: {
    user: 'jhashubham976@gmail.com',
    pass: 'lwfr rrzd qmmh zrpl'
  }
      });
      var mailOptions = {
        from: 'jhashubham976@gmail.com',
        to: [email],
        subject: 'Nexiara Verification Code',
        text: `${otp}`
      };
      
      transporter.sendMail(mailOptions,async function(error, info){
        if (error) {
            console.log(error)
          return res.json({success:false,msg:"Unable to send the mail"})
        } else {
            await Participant.findOneAndUpdate({contact:contact},{firstName:firstName,lastName:lastName,contact:contact,email:email,verify:false,otp:otp});
            return res.json({success:true,msg:'Mail sent successfully'})
        }
      });
   })  
   app.post('/verifyMail1',async (req,res)=>{
    const {otp,email}=req.body;
    const f1=await Participant.findOne({email:email})
    if(!f1){
        return res.json({success:false,msg:'Mail not found in the record'})
    }
    else {
        if(f1.otp==otp){
            return res.json({success:true,msg:'OTP verified successfuly'})
        }
        else {
            return res.json({success:false,msg:'Enter correct OTP'})
        }
    }
})
app.post('/register',async (req,res)=>{
    const {firstName,lastName,mail,contact}=req.body
    try{
        console.log(mail,contact)
        const register=await Participant.findOne({email:mail,contact:contact})
        if(!register){
            return res.json({success:false,msg:'Please enter verified mail id and contact'});
        }
        else {
                    await Participant.findOneAndUpdate({email:mail},{
                        firstName:firstName,lastName:lastName,email:mail,contact:contact,verify:true,
                        otp:''
                    })
                    return res.json({success:true,msg:'Registered Successfully'})
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
                        return res.status(200).json({success:true,msg:'Successfully Registered'})
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

app.get('/getData',fetchuser,async(req,res)=>{
    const user=req.user;
    const p1=await User.findOne({email:user.id});
    if(p1){
        return res.json({success:true,user:p1.firstName})
    }
    else {
        return res.json({success:false,msg:'No such user exist'})
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
                  let authtoken = jwt.sign(data, process.env.USER_KEY);
                return res.status(200).json({success:true,token:authtoken,name:register.firstName})
            } 
    })
}
else {
    return res.json({success:false,msg:'no user with this email id exist'})

}
}
    catch(error){
        return res.json({success:false,msg:'no user with this email id exist'})
    }
})


app.listen(8000,()=>{
    console.log('server listening on port 8000')
})