import React,{useEffect, useState} from 'react'
import { useNavigate,useLocation } from 'react-router-dom';

function Sidebar1() {
    const [nav,setNav]=useState([true,false,false,false,false,false,false])
    const locate=useLocation();
    const url=locate.pathname
    useEffect(()=>{
        if(url=='/event1'){
            setNav([false,true,false,false,false,false,false])
        }
    },[])
    const navigate=useNavigate()
    const handleClick=(e,url,ind)=>{
        e.preventDefault();
        const alp=[false,false,false,false,false,false,false]
        alp[ind]=true;
        setNav(alp);
        navigate(`/${url}`)
    }
    const handleLogout=(e)=>{
        e.preventDefault();
        localStorage.removeItem('token1')
        navigate('/login1')
    }
  return (
    <div className='flex flex-col gap-3 mt-5'>
        <div className='flex gap-9'>
        <div className={`${nav[0]?'bg-[#315EFF]':''} hidden lg:block w-1 h-full`}></div>
      <div onClick={(e)=>{handleClick(e,'dashboard1',0)}} className={`cursor-pointer font-semibold ${nav[0]?'text-white bg-[#315EFF]':''} rounded-lg py-2 px-5`}>Dashboard</div>
      </div>
      <div className='flex gap-9'>
        <div className={`${nav[1]?'bg-[#315EFF]':''} hidden lg:block w-1 h-full`}></div>
      <div onClick={(e)=>{handleClick(e,'event1',1)}} className={`cursor-pointer font-semibold  ${nav[1]?'text-white bg-[#315EFF]':''} py-2 px-5 rounded-lg`}>Events</div>
      </div>
      <div className='flex gap-9'>
        <div className={`${nav[2]?'bg-[#315EFF]':''} hidden lg:block w-1 h-full`}></div>
      <div className={` cursor-pointer font-semibold ${nav[2]?'text-white bg-[#315EFF]':''}  py-2 px-5 rounded-lg`}>Quiz</div>
      </div>
      <div className='flex gap-9'>
        <div className={`${nav[3]?'bg-[#315EFF]':''} hidden lg:block w-1 h-full`}></div>
      <div className={`cursor-pointer font-semibold  ${nav[3]?'text-white bg-[#315EFF]':''} py-2 px-5 rounded-lg`}>Analytics</div>
      </div>
      <div className='flex gap-9'>
        <div className={`${nav[4]?'bg-[#315EFF]':''} hidden lg:block w-1 h-full`}></div>
      <div className={`cursor-pointer font-semibold  ${nav[4]?'text-white bg-[#315EFF]':''} py-2 px-5 rounded-lg`}>Calendar</div>
      </div>
      <div className='flex gap-9'>
        <div className={`${nav[5]?'bg-[#315EFF]':''} hidden lg:block w-1 h-full`}></div>
      <div className={`cursor-pointer font-semibold  ${nav[5]?'text-white bg-[#315EFF]':''} py-2 px-5 rounded-lg`}>Invoices</div>
      </div>
      <hr/>
      <div className='flex gap-9'>
        <div className={`${nav[5]?'bg-[#315EFF]':''} hidden lg:block w-1 h-full`}></div>
      <div className={`cursor-pointer font-semibold  ${nav[5]?'text-white bg-[#315EFF]':''} py-2 px-5 rounded-lg`}>Settings</div>
      </div>
      <div className='flex gap-9'>
        <div className={`${nav[5]?'bg-[#315EFF]':''} hidden lg:block w-1 h-full`}></div>
      <div onClick={(e)=>{handleLogout(e)}} className={`cursor-pointer font-semibold  ${nav[5]?'text-white bg-[#315EFF]':''} py-2 px-5 rounded-lg`}>Log Out</div>
      </div>
    </div>
  )
}

export default Sidebar1
