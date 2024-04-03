import React,{useState,useEffect} from 'react'
import Logo from '../assets/logo.png' 
import c1 from '../assets/Rectangle 12.png'
import {toast } from 'react-toastify';
import {validate} from 'react-email-validator';
import { Link,useLocation,useNavigate } from 'react-router-dom';


function Register() {
    const [verify1,setVerify1]=useState(false);
    const [verify2,setVerify2]=useState(false);
    const [first,setFirst]=useState('');
    const [second,setSecond]=useState('');
    const [mail,setMail]=useState('');
    const [contact,setContact]=useState('');
    const [check,setCheck]=useState(false);
    const [otp1,setOtp1]=useState('');
    const [otp2,setOtp2]=useState('');
    const [event,setEvent]=useState('')
    const locate=useLocation();
    const navigate=useNavigate()
    useEffect(()=>{
        const queryParams = new URLSearchParams(location.search);
        const param1 = queryParams.get('event');
        setEvent(param1)
    },[])
    const sendOTP=async ()=>{
        if(contact.length==0 || first.length=='0' || second.length=='0'){toast.error('Please enter the correct contact number for verification',{
            closeOnClick:true,
            autoClose:4000,
            pauseOnHover:true
        });
        return;
    }
    const resp=await fetch('http://localhost:8000/verifyContact',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            firstName:first,
            lastName:second,
            contact:contact,
        })
    })
    const alp=await resp.json();
    if(alp.success){
        toast.success(alp.msg,{
            autoClose:4000,
    pauseOnHover:true,
    closeOnClick:true
        })
    }
    else {
        toast.error(alp.msg,{
            autoClose:4000,
    pauseOnHover:true,
    closeOnClick:true
        })
    }
    }
    const verifyOTP=async ()=>{
        if(otp1.length==0 || contact.length==0){
            toast.error('Please enter the contact and the otp',{
                autoClose:4000,
                pauseOnHover:true,
                closeOnClick:true
            })
            return;
        }
        const resp=await fetch('http://localhost:8000/verifyContact1',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                contact:contact,
                otp:otp1
            })
        })
        const resp1=await resp.json();
        setVerify1(resp1.success)
        if(resp1.success){
            toast.success(resp1.msg,{
                autoClose:4000,
        pauseOnHover:true,
        closeOnClick:true
            })
        }
        else {
            toast.error(resp1.msg,{
                autoClose:4000,
        pauseOnHover:true,
        closeOnClick:true
            })
        }
    }
    const sendOTP1=async ()=>{
        if(mail.length==0 || contact.length==0 || !validate(mail) ||  first.length=='0' || second.length=='0'){toast.error('Please enter all the details for verification',{
            closeOnClick:true,
            autoClose:4000,
            pauseOnHover:true,
        });
        return;
    }
    else if(!verify1){
        toast.error('Please verify contact first',{
            closeOnClick:true,
            autoClose:4000,
            pauseOnHover:true,
        })
        return;
    }
    const resp=await fetch('http://localhost:8000/verifyMail',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            firstName:first,
            lastName:second,
            contact:contact,
            email:mail
        })
    })
    const alp=await resp.json();
    if(alp.success){
        toast.success(alp.msg,{
            autoClose:4000,
    pauseOnHover:true,
    closeOnClick:true
        })
    }
    else {
        toast.error(alp.msg,{
            autoClose:4000,
    pauseOnHover:true,
    closeOnClick:true
        })
    }
    }
    const verifyOTP1=async ()=>{
        if(otp2.length==0 || mail.length==0){
            toast.error('Please enter the email and the otp',{
                autoClose:4000,
                pauseOnHover:true,
                closeOnClick:true
            })
            return;
        }
        const resp=await fetch('http://localhost:8000/verifyMail1',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:mail,
                otp:otp2
            })
        })
        const resp1=await resp.json();   
        setVerify2(resp1.success)
        if(resp1.success){
            toast.success(resp1.msg,{
                autoClose:4000,
        pauseOnHover:true,
        closeOnClick:true
            })
        }
        else {
            toast.error(resp1.msg,{
                autoClose:4000,
        pauseOnHover:true,
        closeOnClick:true
            })
        }
    }
    const register=async ()=>{
        if(!verify1){
            toast.error('Please verfiy contact first',{
                closeOnClick:true,
            autoClose:4000,
            pauseOnHover:true,
            })
            return;
        }
        if(!verify2){
            toast.error('Please verfiy contact first',{
                closeOnClick:true,
            autoClose:4000,
            pauseOnHover:true,
            })
            return;
        }
        if(!check){
            toast.error('Accept terms and conditions',{
                closeOnClick:true,
            autoClose:4000,
            pauseOnHover:true,
            })
            return;
        }
        const resp=await fetch('http://localhost:8000/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                firstName:first,
                lastName:second,
                contact:contact,
                mail:mail
            })
        })
        const resp1=await resp.json()
        if(resp1.success){
            localStorage.setItem('token1',resp1.token)
            setFirst('');setSecond('');setMail('');setContact('');setCheck(false);setVerify1(false);setVerify2(false);setOtp1('');setOtp2('')
            navigate('/dashboard1',{state:{event:event}})
        }
        if(resp1.success){
            toast.success(resp1.msg,{
                autoClose:4000,
        pauseOnHover:true,
        closeOnClick:true
            })
        }
        else {
            toast.error(resp1.msg,{
                autoClose:4000,
        pauseOnHover:true,
        closeOnClick:true
            })
        }
    }
  return (
    <div className='flex flex-wrap-reverse sm:flex-nowrap flex-row justify-center py-2 w-full lg:w-5/6 mx-auto'>
      <div className='bg-[#C6D2ED] w-5/6 sm:w-1/2 rounded-xl flex py-2 flex-col justify-center'>
        <img src={Logo} alt="Not found" className='mx-auto' />
        <div className='text-md font-bold text-center mt-5'>Register to Enroll Nexiaras Training Program</div>
        <div className='w-5/6 md:w-1/2 mx-auto mt-3'>
        <div>First Name</div>
        <input type="text" value={first} onChange={(e)=>{setFirst(e.target.value)}} className='w-full py-2 px-3 text-md outline-none border border-[#315EFF] rounded-lg placeholder:text-sm' placeholder='Enter your first name'/>
        <div className='mt-2'>Last Name</div>
        <input type="text" value={second} onChange={(e)=>{setSecond(e.target.value)}} className='w-full py-2 px-3 text-md outline-none border border-[#315EFF] rounded-lg placeholder:text-sm' placeholder='Enter your last name'/>
        <div className='mt-2'>Mobile</div>
        <input type="text" value={contact} onChange={(e)=>{setContact(e.target.value)}} className='w-full py-2 px-3 text-md outline-none border border-[#315EFF] rounded-lg placeholder:text-sm' placeholder='Enter your valid mobile number'/>
        <div className='mt-2'>Enter OTP</div>
        <input type="text" value={otp1} onChange={(e)=>{setOtp1(e.target.value)}} className='w-full py-2 px-3 text-md outline-none border border-[#315EFF] rounded-lg placeholder:text-sm' placeholder='Enter OTP received on mobile'/>
        <div className='flex gap-2 mt-2'>
            <button onClick={()=>{sendOTP()}} className='py-2 px-4  font-semibold text-white bg-[#315EFF] rounded-lg'>Send OTP</button>
            <button onClick={()=>verifyOTP()} className='py-2 px-4 font-semibold text-white bg-[#315EFF] rounded-lg'>Verfiy OTP</button>
        </div>
        <div className='mt-2'>Email Address</div>
        <input type="email" value={mail} onChange={(e)=>{setMail(e.target.value)}} className='w-full py-2 px-3 text-md outline-none border border-[#315EFF] rounded-lg placeholder:text-sm' placeholder='Enter your username or email address here'/>
        <div className='mt-2'>Enter OTP</div>
        <input type="text" value={otp2} onChange={(e)=>{setOtp2(e.target.value)}} className='w-full py-2 px-3 text-md outline-none border border-[#315EFF] rounded-lg placeholder:text-sm' placeholder='Enter OTP received on email'/>
        <div className='flex gap-2 mt-2'>
            <button onClick={()=>{sendOTP1()}} className='py-2 px-4 font-semibold text-white bg-[#315EFF] rounded-lg'>Send OTP</button>
            <button onClick={()=>verifyOTP1()} className='py-2 px-4 font-semibold text-white bg-[#315EFF] rounded-lg'>Verfiy OTP</button>
        </div>
        </div>
        <div className='w-1/2 mx-auto flex gap-2 mt-2'>
            <input type="checkbox" checked={check} onChange={(e)=>{setCheck(e.target.checked)}} className='w-4'/>
            <div className='font-medium'>Terms and conditions</div>
        </div>
        <div className='w-1/2 mx-auto'>
        <button onClick={()=>register()} className='w-full mt-5 py-2 text-xl font-semibold text-white bg-[#315EFF] rounded-lg'>Register</button>
        </div>
        <div className='text-sm w-1/2 mx-auto mt-1 text-center'>
      If already registered
      <Link to='/login1' className='font-semibold underline ms-1'>Login here</Link>
      </div>
      </div>
        <img src={c1} className='rounded-xl h-[100vh]  sm:w-1/2' alt="" /> 
    </div>
  )
}

export default Register
