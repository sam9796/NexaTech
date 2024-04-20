import React,{useState,useEffect} from 'react'
import Navbar from './navbar'
import Sidebar from './sidebar'
import Bell from '../assets/Icon.png'
import Flag from '../assets/Flag.png'
import Man from '../assets/man.png'
import { toast } from 'react-toastify';


function Dashboard() {
  const [visible,setVisible]=useState(true);
  const [id,setId]=useState('')
  const handle=async ()=>{
    const resp=await fetch('http://3.110.223.82:8000/getData2',{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token1')
        }
    })
    const resp1=await resp.json();
    if(resp1.success){
        setId(resp1.user);
    }
    else {
        toast.error(resp1.msg,{
            autoClose:4000,
            pauseOnHover:true,
            closeOnClick:true
        })
    }
}
  useEffect(()=>{
    handle();
  },[])
  return (
    <div>
      <Navbar visible={visible} setVisible={setVisible}/>
      <div className='flex gap-2 mt-5'>
      <div className='m-0 p-0 hidden lg:block'>
        <Sidebar/>
        </div>
        <div className='w-full rounded-md bg-[#CCEFFF]'>

        </div>
      <div className={`border-2 mx-auto text-center  p-0 ${visible?'hidden':'block'} absolute px-5 rounded-lg bg-white right-0 lg:hidden`}>
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
        <div>Admin</div>
        </div>
        <Sidebar/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
