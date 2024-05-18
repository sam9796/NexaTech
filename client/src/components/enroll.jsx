import React,{useEffect,useState} from 'react'
import Navbar2 from './navbar2'
import Sidebar1 from './sidebar1'
import { useLocation,useNavigate } from 'react-router-dom'
import id from '../assets/man.png'
import Bell from '../assets/Icon.png'
import Flag from '../assets/Flag.png'
import Man from '../assets/man.png'

function enrol() {
  const [visible,setVisible]=useState(true);
  const [id,setId]=useState('');
  const locate=useLocation();
  const navigate=useNavigate();
  useEffect(()=>{
    if(!locate.state){
      navigate('/dashboard1');
    }
    else if(locate.state && !locate.state.value){
      navigate('/dashboard1');
    }
  },[])
  const handlePayment=async ()=>{
    const resp=await fetch('http://localhost:8000/api/payment',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token1')
        }
    })
    const key=await fetch('http://localhost:8000/api/get_key',{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token1')
        }
    })

    const key1=await key.json()
    const resp1=await resp.json();
    if(key1.success && resp1.success){
      const options={
        key:key1.key,
        amount:'1000',
        currency:'INR',
        name:key1.user,
        description:'Test transaction',
        image:id,
        order_id:resp1.order.id,
        callback_url:'http://localhost:8000/api/verification',
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    }
    const razor=new window.Razorpay(options)
    
    razor.open()}
}
const handle=async ()=>{
  const resp=await fetch('http://localhost:8000/getData1',{
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
      navigate('/login1')
  }
}
useEffect(()=>{handle()},[])
  return (
    <div>
          <Navbar2 visible={visible} setVisible={setVisible}/>
    <div className='flex gap-2 mt-5'>
    <div className='m-0 p-0 hidden lg:block'>
      <Sidebar1/>
      </div>
      <div className='w-full rounded-md bg-[#CCEFFF] lg:mr-3 py-5 mx-auto'>
        <div class='text-4xl text-[#315EFF] font-semibold text-center'>Enroll to our program</div>
        <br />
        <div className='text-center'>
        <button onClick={()=>{handlePayment()}} className='px-6 py-2 mx-10 my-5 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Pay Now</button>
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


export default enrol
