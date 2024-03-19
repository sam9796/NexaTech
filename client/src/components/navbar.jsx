import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '../assets/logo.png'
import Bell from '../assets/Icon.png'
import Flag from '../assets/Flag.png'
import Man from '../assets/man.png'

function Navbar() {
    const [user,setUser]=useState('');
    const navigate=useNavigate();
    useEffect(()=>{
        const handle=async ()=>{
            const resp=await fetch('http://localhost:8000/getData',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':localStorage.getItem('token')
                }
            })
            const resp1=await resp.json();
            if(resp1.success){
                setUser(resp1.user);
                console.log(user)
            }
            else {
                toast.error(resp1.msg,{
                    autoClose:4000,
                    pauseOnHover:true,
                    closeOnClick:true
                })
                navigate('/login')
            }
        }
        if(localStorage.getItem('token'))handle();
        else navigate('/login')
    },[])
  return (
    <div className='flex w-full items-center mt-5 pl-5'>
      <div>
        <img src={Logo} alt="" className='w-1/2'/>
      </div>
      <div className='flex w-5/6 items-center justify-between px-10'>
        <div className='my-auto w-1/3 flex border h-10 border-[#315EFF] bg-[#EEF2FF] rounded-full px-4'>
        <input type="text" className='bg-[#EEF2FF] w-full outline-none border-none py-2' placeholder='Search'/>
        <div className='my-auto'>
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<g opacity="0.5">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.69366 12.535C12.4235 11.3748 13.696 8.22136 12.5358 5.49152C11.3757 2.76168 8.22221 1.4892 5.49237 2.64936C2.76253 3.80951 1.49005 6.96297 2.6502 9.69281C3.81036 12.4226 6.96382 13.6951 9.69366 12.535Z" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.3904 11.3896L15.5557 15.5556" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>
</div>
        </div>
        <div className='flex gap-5 items-center'>
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
        <div>
            <div className='text-md'>{user}</div>
            <div className='text-xs'>Admin</div>
        </div>
        
        </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
