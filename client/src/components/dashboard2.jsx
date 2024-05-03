import React,{useState,useEffect} from 'react'
import Navbar1 from './navbar2'
import Sidebar1 from './sidebar1'
import Bell from '../assets/Icon.png'
import Flag from '../assets/Flag.png'
import Man from '../assets/man.png'
import { toast } from 'react-toastify';
import '../css/dashboard.css'
import { useNavigate } from 'react-router-dom'

function Dashboard2() {
    const [id,setId]=useState('')
    const [user,setUser]=useState('')
    const [visible,setVisible]=useState(true);
    const navigate=useNavigate();
    const handle=async ()=>{
        const resp=await fetch('http://13.232.129.172:8000/getData1',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token1')
            }
        })
        const resp1=await resp.json();
        if(resp1.success){
            setId(resp1.user);
            setUser(resp1.id);
        }
        else {
            toast.error(resp1.msg,{
                autoClose:4000,
                pauseOnHover:true,
                closeOnClick:true
            })
            navigate('/login1')
        }
      }
      useEffect(()=>{
        handle();
      },[])
      const handleClick=(e)=>{
        e.preventDefault();
        navigate('/dashboard1',{state:{submit:false}})
      }
  return (
    <div>
    <Navbar1 setVisible={setVisible} visible={visible}/>
    <div className='flex gap-2 mt-5'>
    <div className='m-0 p-0 hidden lg:block'>
      <Sidebar1/>
      </div>
      <div className='w-full rounded-md bg-gradient-to-r from-sky-500 to-indigo-500'>
      <div className='content'>
  <div className="wrapper-1">
    <div className="wrapper-2">
      <h1 className='text-7xl md:text-5xl'>Thank you !</h1>
      <p className='mt-2'>Thanks for attending our event </p>
      <button className="go-home" onClick={(e)=>{handleClick(e)}}>
      go home
      </button>
    </div>
</div>
</div>
      </div>
      <div className={`mx-auto text-center  p-0 ${visible?'hidden':'block'} absolute px-5 rounded-lg bg-white right-0 lg:hidden`}>
      <div className='flex flex-col gap-5 items-center my-2'>
        <img src={Bell} alt="" />
        <div className='flex gap-1'>
            <img src={Flag} alt="" className='gap-1'/>
            <select name="lang" id="lang" className='outline-none'>
            <option value="eng">English</option>
            <option value="frc">French</option>
            </select>
        </div>
        <div className='flex gap-1'>
        <img src={Man} alt="" />
            <div className='text-md font-semibold my-auto'>{id}</div>
        
        </div>
        </div>
      <Sidebar1/>
      </div>
    </div>
  </div>
  )
}

export default Dashboard2
