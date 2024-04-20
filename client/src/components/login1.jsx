import React,{useState} from 'react'
import c1 from '../assets/Rectangle 12.png'
import Logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';
import {validate} from 'react-email-validator';

function login1() {
    const navigate=useNavigate()
    const [user,setUser]=useState('');
    const handleClick=async ()=>{
        if(!validate(user)){
            toast.error('Enter a valid email',{
                autoClose:4000,
                pauseOnHover:true,
                closeOnClick:true
            })
            return;
        }
        const resp=await fetch('http://3.110.223.82:8000/loginParticipant',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({user:user})
        })
        const resp1=await resp.json();
        if(resp1.success){
            toast.success('Logged in successfully',{
                autoClose:4000,
                pauseOnHover:true,
                closeOnClick:true
            })
            localStorage.setItem('token1',resp1.token)
            setUser('')
            navigate('/dashboard1')
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
      <div className='text-xl font-bold text-center mt-10'>Welcome Participant</div>
      <div className='text-md font-bold text-center mt-7'>Login to Nexiara Dashboard</div>
      <div className='w-5/6 md:w-1/2 mx-auto mt-5'>
      <div >Email Address</div>
      <input type="email" value={user} onChange={(e)=>{setUser(e.target.value)}} className='w-full py-2 px-3 text-md outline-none border border-[#315EFF] rounded-lg placeholder:text-sm' placeholder='Enter your username or email address here'/>
      </div>
      <div className='w-1/2 mx-auto'>
      <button onClick={()=>{handleClick()}} className='w-full mt-5 py-2 text-xl font-semibold text-white bg-[#315EFF] rounded-lg'>Log In</button>
      </div>
      <div className='text-sm w-1/2 mx-auto mt-1 text-center'>
      If not registered
      <Link to='/register' className='font-semibold underline ms-1'>Register here</Link>
      </div>
    </div>
      <img src={c1} className='rounded-xl h-[100vh] sm:w-1/2' alt="" />
  </div>
  )
}

export default login1
