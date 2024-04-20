const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const Participant = require("./Model/Register.model.js");
const User = require("./Model/User.model.js");
const Event=require('./Model/Event.model.js');
const bcrypt=require('bcryptjs')
const { v4: uuidv4 } = require('uuid');
const app=express()
const jwt = require("jsonwebtoken");
const otpGenerator = require('otp-generator')
const nodemailer=require('nodemailer')
const fetchuser = require("./fetchUser.js");
const bodyParser = require('body-parser');
const Question=require('./Model/Question.model.js')
const Razorpay=require('razorpay');
const Payment= require("./Model/Payment.model.js");
const Contact=require('./Model/Contact.model.js')
const crypto=require('crypto')
const path=require('path')
const Quiz=require('./Model/Quiz.model.js')
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const buildPath = path.join(__dirname, "../client/dist"); 

//serving the static files which is our build here and specifying all the paths here where are there on the website

app.use(express.static(buildPath));
app.get('/login1', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
app.get('/login', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
app.get('/dashboard1', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
app.get('/event', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
app.get('/indiEvent', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
app.get('/result', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
app.get('/enroll', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
app.get('/register', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
app.get('/quiz', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
app.get('/event1', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
app.get('/eventmain', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
app.get('/quizmain', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
app.get('/indiQuiz', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });

const mongoClient=mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch((err) => {
    console.log(err);
  });

  const instance=new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret
});

app.post('/saveContact',async (req,res)=>{
    const {name,mail,description}=req.body
    await Contact.create({name:name,email:mail,description:description})
})

app.post('/verifyMail',async (req,res)=>{
    const {firstName,lastName,contact,email}=req.body;
    const f1=await Participant.findOne({email:email})
    if(f1){
        return res.json({success:false,msg:'Mail already in use'})
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
          return res.json({success:false,msg:"Unable to send the mail"})
        } else {
            await Participant.create({firstName:firstName,lastName:lastName,contact:contact,email:email,verify:false,otp:otp});
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
        const register=await Participant.findOne({email:mail,contact:contact})
        if(!register){
            return res.json({success:false,msg:'Please enter verified mail id and contact'});
        }
        else {
                    await Participant.findOneAndUpdate({email:mail},{
                        firstName:firstName,lastName:lastName,email:mail,contact:contact,verify:true,
                        otp:''
                    })
                    const data = {
                        user: {
                          id: mail,
                        },
                      };
                      let authtoken = jwt.sign(data, process.env.USER_KEY);
                    return res.json({success:true,msg:'Registered Successfully',token:authtoken})
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
app.get('/getData1',fetchuser,async(req,res)=>{
    const user=req.user;
    const p1=await Participant.findOne({email:user.id});
    if(p1){
        return res.json({success:true,user:p1.firstName,id:p1.email})
    }
    else {
        return res.json({success:false,msg:'No such user exist'})
    }
})
app.get('/getData2',fetchuser,async(req,res)=>{
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

app.post('/saveEvent',fetchuser,async (req,res)=>{
    const user=req.user.id;
    const {event,college,date,time,place,desc,file}=req.body
    const l1=await Event.create({user:user,eventName:event,college:college,date:date,time:time,place:place,description:desc,image:file,finished:false})
    return res.json({success:true,msg:'Event created successfully'})
    
})

app.get('/getEvents',fetchuser,async (req,res)=>{
    const user=req.user.id;
    let events=await Event.find({user:user});
    if(!events){
        return res.json({success:false})
    }
    else {
        return res.json({success:true,events:events});
    }
})
app.delete('/deleteEvent',fetchuser,async (req,res)=>{
    await Event.findByIdAndDelete(req.body.id);
    return res.json({success:true})
})
app.patch('/editStop',fetchuser,async (req,res)=>{
    const {eventId}=req.body;
    await Event.findByIdAndUpdate(eventId,{finished:true});
    return res.json({success:true,msg:'Event finished'})
})
app.patch('/editEvent',fetchuser,async (req,res)=>{
    const {id,event,college,date,time,place,desc,image}=req.body
    await Event.findByIdAndUpdate(id,{
        eventName:event,college:college,date:date,time:time,place:place,description:desc,image:image
    })
    return res.json({success:true,msg:'Event edited successfully'})
    
})
app.post('/addQues',fetchuser,async(req,res)=>{
    const {eventId,quizId,description,options,type,response}=req.body
    await Question.create({
        options:options,type:type,eventId:eventId,quizId:quizId,description:description,resp:response
    })
    return res.json({success:true})
})
app.post('/getAllQues',fetchuser,async (req,res)=>{
    const {id}=req.body
    let l1=await Question.find({eventId:id});
    let l2=await Event.findOne({_id:id})
    let l3=[];
    for(let i=0;i<(l2?l2.quizzes.length:0);++i)
        { let l4=await Quiz.findOne({_id:l2.quizzes[i]});
            l3.push(l4.name)
        }
    return res.json({success:true,ques:l1,quizzes:l3})
})
app.post('/getAllQues1',fetchuser,async (req,res)=>{
    const {id}=req.body;
    let l1=await Question.find({quizId:id});
    return res.json({success:true,ques:l1})
})
app.post('/getAllQues2',fetchuser,async (req,res)=>{
    const {id}=req.body
    let l1=await Event.findOne({_id:id});
    let l2=await Question.find({eventId:id,quizId:''});
    for(let i=0;i<l1.quizzes.length;++i){
        let l3=await Question.find({quizId:l1.quizzes[i]});
        for(let j=0;j<l3.length;++j)l2.push(l3[j]);
    }
    // console.log(l2)
    return res.json({success:true,ques:l2})
})
app.delete('/deleteQues',fetchuser,async (req,res)=>{
    const {id}=req.body
    const l1=await Question.findByIdAndDelete(id);
    return res.json({success:true})
})
app.patch('/editQues',fetchuser,async (req,res)=>{
    const {id,description,options,type,response,quizId,eventId}=req.body;
    await Question.findByIdAndUpdate(id,{
        quizId:quizId,
        description:description,eventId:eventId,options:options,type:type,resp:response
    })
    return res.json({success:true})
})
app.post('/loginParticipant',async (req,res)=>{
    const {user}=req.body
    const l1=await Participant.findOne({email:user})
    if(l1){
        const data = {
            user: {
              id: user,
            },
          };
          let authtoken = jwt.sign(data, process.env.USER_KEY);
        return res.json({success:true,token:authtoken});
    }
    else {
        return res.json({success:false,msg:'this email is not registered'})
    }
})
app.post('/getAllEvents1',fetchuser,async (req,res)=>{
    const {eventId}=req.body
    const events=await Event.find({_id:eventId});
    return res.json({success:true,events:events,user:req.user.id});
})
app.get('/getAllEvents',fetchuser,async (req,res)=>{
    const events=await Event.find();
    return res.json({success:true,events:events,user:req.user.id});
})
app.get('/getAllEvents2',fetchuser,async (req,res)=>{
    const events=await Event.find();
    const user=req.user.id
    let l1=[];
    for(let i=0;i<events.length;++i){
        if(events[i].participant.indexOf(user)!=-1){l1.push(events[i])}
    }
    return res.json({success:true,events:l1,user:req.user.id});
})
app.post('/getPart',fetchuser,async (req,res)=>{
    const {eventId,id}=req.body;
    const user=req.user.id;
    const res1=await Participant.findOne({email:user})
    let k1,k2,k3;
    for(let i=0;i<res1.events.length;++i){
        if(res1.events[i].eventId==eventId){

            for(let j=0;j<res1.events[i].quesId.length;++j){
                if(res1.events[i].quesId[j]==id){
                    if(res1.events[i].quesCheck.length>j)k1=res1.events[i].quesCheck[j];
                    
                    if(res1.events[i].options.length>j){k2=res1.events[i].options[j].finished;
                    k3=res1.events[i].options[j].selected;
                }
                }
            }
        }
    }
    return res.json({success:true,k1:k1,k2:k2,k3:k3}); 
})
app.post('/registerParticipant',fetchuser,async (req,res)=>{
    const {id}=req.body;
    if(!id)return res.json({success:false})
    const user=req.user.id
    let e1=await Event.find({_id:id})
    let l1=e1[0].participant;
    l1.push(user);
    await Event.findByIdAndUpdate(id,{participant:l1})
    return res.json({success:true});
})
app.post('/postQues',fetchuser,async (req,res)=>{
    const {eventId,id}=req.body;
    let user=req.user.id;
    let k1=await Participant.findOne({email:user});
    let k2=k1.events;
    let k3=[]
    let k4=false;
    for(let k=0;k<id.length;++k){
        await Question.findByIdAndUpdate(id[k],{eventId:eventId})
    for(let i=0;i<k2.length;++i){
        if(k2[i].eventId==eventId){
            if(k2[i].quesId.indexOf(id[k])==-1)
            {k2[i].quesId.push(id[k]); k2[i].quesCheck.push(false);k2[i].options.push({finished:false,selected:'-1'})}
                k3=k2[i].quesId;
                k4=true;
        }
    }}
    if(!k4){
        k2.push({eventId:eventId,quesId:[id[0]],quesCheck:[false],options:[{selected:'-1',finished:false}]})
        for(let k=1;k<id.length;++k){
            k2[0].quesId.push(id[k]); k2[0].quesCheck.push(false);k2[0].options.push({finished:false,selected:'-1'})
        }
    }
    await Participant.findOneAndUpdate({email:user},{events:k2})
    let k5=[];
    for(let i=0;i<k3.length;++i){
        let l2=await Question.findOne({_id:k3[i]});
        if(l2.quizId=='')k5.push(k3[i]);
    }
    if(k5.length==0)return res.json({success:true,ques:[id]})
    else return res.json({success:true,ques:k5})
})
app.post('/getQues1',fetchuser,async (req,res)=>{
    const {quesId}=req.body;
    let e2=await Question.findOne({_id:quesId});
    return res.json({success:true,ques:e2});
})

app.post('/checkQues',fetchuser,async (req,res)=>{
    const {ques,resp}=req.body;
    const id=req.user.id;
    let arr=[]
    let t1="";
        if(ques.type=='single'){
            let k1=resp;
            if(ques.options[k1]==ques.resp){
                arr.push(true);
            }
            else arr.push(false);
            t1=resp;
            let t3=ques.count;
            if(t3.length==0){
                let t2=[];
                for(let i=0;i<ques.options.length;++i){
                    t2.push(0);
                }
                t2[k1]+=1;
                await Question.findOneAndUpdate({_id:ques._id},{count:t2})
            }
            else {ques.count[k1]+=1;
                await Question.findOneAndUpdate({_id:ques._id},{count:ques.count})}
        }
        else if(ques.type=='multiple'){
            let arr1=[];
            let t2=ques.count;
            let t3=[];
            if(t2.length==0){
                for(let i=0;i<ques.options.length;++i){
                    t3.push(0);
                }
            }
            if(t3.length==0){
                t3=ques.count;
            }
            for(let j=0;j<resp.length;++j){
                if(resp[j]){arr1.push(j);t1=t1+(j);t3[j]+=1}
            }
            let alp=true;
            for(let j=0;j<ques.resp.length;++j){
                let t1=parseInt(ques.resp[j]);
                if(arr1.indexOf(t1)==-1){alp=false;break;}
            }
            arr.push(alp);
            await Question.findOneAndUpdate({_id:ques._id},{count:t3})
        }
        else if(ques.type=='dropdown'){
            let t2=ques.count;
            let t3=[];
            if(t2.length==0){
                for(let i=0;i<ques.options.length;++i){
                    t3.push(0);
                }
            }
            if(t3.length==0){
                t3=ques.count;
            }
            if(ques.resp==resp){arr.push(true);}
            else {arr.push(false);}
            let ind=-1;
            for(let i=0;i<ques.options;++i){
                if(resp==ques.options[i]){ind=i;break;}
            }
            t3[ind]+=1;
            await Question.findOneAndUpdate({_id:ques._id},{count:t3})
            t1=resp;
        }
        else if(ques.type=='descriptive'){
            let t2=ques.count;
            let t3=[];
            if(t2.length==0){
                t3.push(0);
            }
            if(t3.length==0){
                t3=ques.count;
            }
            t3[0]+=1;
            if(ques.resp==resp){arr.push(true);}
            else {arr.push(false);}
            await Question.findOneAndUpdate({_id:ques._id},{count:t3})
            t1=resp;
        }
        else if(ques.type=='grid'){
            let t2=ques.count
            arr.push(true);
            
            let h=0,v=0;
            let alp=false;
            for(let i=0;i<ques.options.length;++i){
                let p1=ques.options[i].split(':');
                if(p1.length==2){
                    ++h;
                    alp=true;
                }
                if(alp)++v;
                else ++h;
            }
            let t3=[];
            if(t2.length==0){
                for(let i=0;i<v*h;++i)t3.push(0);
            }
            if(t3.length==0){
                t3=ques.count;
            }
            let ind=0;
            for(let i in resp){
                t3[h*ind+parseInt(resp[i])]+=1;
                t1+=(resp[i]);
                ++ind;
            }
            await Question.findOneAndUpdate({_id:ques._id},{count:t3})
        }
        else if(ques.type=='multigrid'){
            let t2=ques.count;
            arr.push(true);
            let h=0,v=0;
            let alp=false;
            for(let i=0;i<ques.options.length;++i){
                let p1=ques.options[i].split(':');
                if(p1.length==2){
                    ++h;
                    alp=true;
                }
                if(alp)++v;
                else ++h;
            }
            let t3=[];
            if(t2.length==0){
                for(let i=0;i<v*h;++i)t3.push(0);
            }
            if(t3.length==0){
                t3=ques.count;
            }
            for(let i=0;i<resp.length;++i){
                for(let j=0;j<resp[0].length;++j){
                    if(resp[i][j]){t1+=j;t3[i*h+j]+=1;}
                }
                if(i!=resp.length-1)t1+=':';
            }
            await Question.findOneAndUpdate({_id:ques._id},{count:t3})
        }else if(ques.type=='linear'){
            let t2=ques.count;
            let t3=[];
            if(t2.length==0){
                for(let i=0;i<ques.options.length;++i){
                    t3.push(0);
                }
            }
            if(t3.length==0){
                t3=ques.count;
            }
            t3[parseInt(resp)]+=1;
            arr.push(true);
            await Question.findOneAndUpdate({_id:ques._id},{count:t3})
            t1+=(resp);
        }
    let part=await Participant.findOne({email:id})
    let i1=part.events;
    for(let i=0;i<i1.length;++i){
        if(i1[i].eventId==ques.eventId){
            
            for(let j=0;j<i1[i].quesId.length;++j){
                if(i1[i].quesId[j]==ques._id)
                {
                
                    i1[i].quesCheck[j]=(arr[0]);
            i1[i].options[j]=({finished:true,selected:t1})}
        }
        }

    }
   
    try {
        
        await Participant.findByIdAndUpdate(part._id,{events:i1});
    return res.json({success:true});
}
    catch(error){
        return res.json({success:false});
    }
})
app.post('/isSubmitted',fetchuser,async(req,res)=>{
    const {eventId}=req.body;
    const id=req.user.id;
    const l1=await Participant.findOne({email:id})
    let k3=false;
    let k4=[];
    for(let i=0;i<l1.events.length;++i){
        if(l1.events[i].eventId==eventId){
            k3=l1.events[i].finshed;
            k4=l1.events[i].quesCheck;
            break;
        }
    }
    return res.json({success:true,finish:k3,ques:k4})
})
app.post('/getEvent1',fetchuser,async (req,res)=>{
    const {eventId}=req.body;
    if(!eventId)return res.json({success:false,msg:'Unable to get the event details'})
    const e1=await Event.find({_id:eventId});
    if(e1){
        return res.json({success:true,event:e1[0],user:req.user.id})
    }
    else res.json({success:false,msg:'Unable to get the event details'})
})
app.post('/getGraph',fetchuser,async (req,res)=>{
    const {id,val}=req.body;
    await Question.findOneAndUpdate({_id:id},{count:val});
    return res.json({success:true});
})
app.post('/checkQues1',fetchuser,async (req,res)=>{
    const {eventId}=req.body;
    const user=req.user.id;
    const p1=await Participant.findOne({email:user})
    for(let i=0;i<p1.events.length;++i){
        if(p1.events[i].eventId==eventId){
            p1.events[i].finshed=true;
            const d1=new Date();
            const dateAfter7Days = new Date(d1.getTime() + (7 * 24 * 60 * 60 * 1000));
            p1.events[i].lastDate=dateAfter7Days;
            await Participant.findOneAndUpdate({email:user},p1);
            break;
        }
    }
    return res.json({success:true});
})
app.get('/api/get_key',fetchuser,(req,res)=>{
    const user=req.user.id
    return res.status(200).json({
        success:true,
        key:process.env.key_id,
        user:user
    })
})

app.post('/api/payment',fetchuser,async (req,res)=>{
    const options={
        amount:1000, //amount in the smallest currency unit
        currency:'INR',
    };
    const order=await instance.orders.create(options)
   return res.status(200).json({
        success:true,
        order
    })
})

app.post('/api/verification',async (req,res)=>{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.key_secret)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

   res.redirect('http://3.110.223.82:8000/dashboard1')
  } else {
   return res.status(400).json({
      success: false,
    });
  }
})
app.post('/getDate',fetchuser,async (req,res)=>{
    const {eventId}=req.body;
    const user=req.user.id;
    const r1=await Participant.findOne({email:user});
    let p1;
    if(r1){
        for(let i=0;i<r1.events.length;++i){
            if(r1.events[i].eventId==eventId){
                p1=r1.events[i].lastDate;
            }
        }
    }
    return res.json({success:true,date:p1});
})
app.post('/getQuiz1',fetchuser,async (req,res)=>{
    const {id,quiz}=req.body
    let l1=await Event.findOne({_id:id});
    let l2=await Quiz.findOne({_id:quiz})
    if(l1.quizzes.indexOf((quiz))==-1){
        l1.quizzes.push(quiz);
    }
    let l3=await Question.find({quizId:quiz})
    for(let i=0;i<l3.length;++i){
        await Question.findByIdAndUpdate(l3[0]._id,{eventId:id});
    }
    await Event.findByIdAndUpdate(id,{quizzes:l1.quizzes})
    
    return res.json({success:true,ques:l3,timer:l2.timer,quiz:l2.name})
})
app.get('/getQuizzes',fetchuser,async (req,res)=>{
    const l1=await Quiz.find();
    return res.json({success:true,quiz:l1})
})
app.get('/getQuizzes2',fetchuser,async (req,res)=>{
    const l1=await Quiz.find({quiz:true});
    return res.json({success:true,quiz:l1})
})
app.get('/getQuizzes1',fetchuser,async (req,res)=>{
    const l1=await Quiz.find({quiz:false});
    return res.json({success:true,quiz:l1})
})
app.post('/saveQuiz',fetchuser,async (req,res)=>{
    const {event,timer}=req.body;
    await Quiz.create({name:event,timer:timer,quiz:true});
    return res.json({success:true})
})
app.post('/saveQuiz1',fetchuser,async (req,res)=>{
    const {event,timer}=req.body;
    await Quiz.create({name:event,timer:timer,quiz:false});
    return res.json({success:true})
})
app.patch('/editQuiz',fetchuser,async (req,res)=>{
    const {id,name,timer}=req.body;
    await Quiz.findByIdAndUpdate(id,{name:name,timer:timer})
    return res.json({success:true})
})
app.delete('/deleteQuiz',fetchuser,async (req,res)=>{
    const {id}=req.body;
    await Quiz.findByIdAndDelete(id);
    return res.json({success:true})
})
app.listen(8000,()=>{
    console.log('server listening on port 8000')
})