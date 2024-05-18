import React,{useState,useEffect} from 'react'
import Logo from '../assets/logo.png' 
import c1 from '../assets/Rectangle 12.png'
import {validate} from 'react-email-validator';
import {toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [user,setUser]=useState('');
  const [pass,setPass]=useState('');
  const navigate=useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/dashboard')
    }
  },[])
  const log=async ()=>{
    if(pass.length==0 || !validate(user)){
      toast.error('Enter valid username and password',{
        autoClose:4000,
        pauseOnHover:true,
        closeOnClick:true
      })
      return;
    }
    const resp=await fetch('http://localhost:8000/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({mail:user,password:pass})
    })
    const resp1=await resp.json();
    if(resp1.success){
      toast.success('Logged in successfully',{
        autoClose:4000,
        pauseOnHover:true,
        closeOnClick:true
      })
      let tok=resp1.token
      localStorage.setItem('token',tok)
      navigate('/dashboard')
      setUser('');setPass('')
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
    <div className='flex flex-wrap-reverse sm:flex-nowrap flex-row justify-center h-[100vh] lg:w-5/6 mx-auto'>
      <div className='bg-[#C6D2ED] w-5/6 sm:w-1/2 rounded-xl flex flex-col justify-center'>
        <img src={Logo} alt="Not found" className='mx-auto' />
        <div className='text-xl font-bold text-center mt-10'>Welcome User</div>
        <div className='text-md font-bold text-center mt-7'>Login to NexaTech Dashboard</div>
        <div className='w-5/6 md:w-1/2 mx-auto mt-5'>
        <div >Email Address</div>
        <input type="email" value={user} onChange={(e)=>{setUser(e.target.value)}} className='w-full py-2 px-3 text-md outline-none border border-[#315EFF] rounded-lg placeholder:text-sm' placeholder='Enter your username or email address here'/>
        <div className='mt-2'>Password</div>
        <input type="password" value={pass} onChange={(e)=>{setPass(e.target.value)}} className='w-full py-2 px-3 text-md outline-none border border-[#315EFF] rounded-lg placeholder:text-sm' placeholder='Enter your password here'/>
        </div>
        <div className='w-1/2 mx-auto'>
        <button onClick={()=>{log()}} className='w-full mt-5 py-2 text-xl font-semibold text-white bg-[#315EFF] rounded-lg'>Log In</button>
        </div>
        <div className='text-sm mx-3 sm:w-1/2 sm:mx-auto mt-1'>
        This login is only for the NexaTech employees. If you are a student and wish to enroll for NexaTech training program, Please cotact us
        <span className='font-semibold underline ms-1'>here</span>
        </div>
      </div>
        <img src={c1} className='rounded-xl h-[100vh] sm:w-1/2' alt="" />
      
    </div>
  )
}

export default Login
