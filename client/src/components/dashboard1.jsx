import React,{useState,useEffect} from 'react'
import Navbar1 from './navbar1'
import Sidebar1 from './sidebar1'
import { toast } from 'react-toastify';
import Bell from '../assets/Icon.png'
import Flag from '../assets/Flag.png'
import Man from '../assets/man.png'
import '../css/header.css'
import { useNavigate,useLocation } from 'react-router-dom';
import '../css/button.css'

function Dashboard1() {
    const [events,setEvents]=useState([])
    const [register,setRegister]=useState([])
    const [finish,setFinish]=useState([])
    const [user,setUser]=useState([])
    const navigate=useNavigate();
    const locate=useLocation()
    const [visible,setVisible]=useState(true);
    const [user1,setUser1]=useState('');
    const [id,setId]=useState('')
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
            setUser1(resp1.id);
            navigate('/dashboard1')
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
    const getAll=async (param1)=>{
        const resp=await fetch('http://13.232.129.172:8000/getAllEvents1',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token1')
            },
            body:JSON.stringify({eventId:param1})
        })
        const resp1=await resp.json();
        if(resp1.success){
                setEvents(resp1.events);
                let arr=[];
                let f1=[]
                // let n=resp1.events.length;
                let u1=resp1.user;
                setUser(u1)
                    if(resp1.events[0].participant.indexOf(u1)==-1){
                        arr.push(false);
                    }
                    else {arr.push(true);}
                    let l3=resp1.events[0]._id
                    const res1=await fetch('http://13.232.129.172:8000/isSubmitted',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json',
                            'auth-token':localStorage.getItem('token1')
                        },
                        body:JSON.stringify({
                            eventId:l3
                        })
                    })
                    const res2=await res1.json();
                    if(res2.success){
                        f1.push(res2.finish);
                    }
                setFinish(f1);
                setRegister(arr);
        }
        else {
            toast.error('Unable to load events',{
                autoClose:4000,
                pauseOnHover:true,
                closeOnClick:true
            })
        }
    }
    const handleAlp=async (param1)=>{
        const res1=await fetch('http://13.232.129.172:8000/getEvent1',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token1')
            },
            body:JSON.stringify({eventId:param1})
        })
        const res2=await res1.json();
        
    }
    useEffect(()=>{
        const l1=localStorage.getItem('eventId')
        if(l1){
        handleRegister(l1);
         handleAlp(l1);
    getAll(l1);
    handle();}
    },[])
    const handleRegister=async (id)=>{
        console.log(id)
        const resp=await fetch('http://13.232.129.172:8000/registerParticipant',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token1')
            },
            body:JSON.stringify({id:id})
                })
        const resp1=await resp.json();
        if(resp1.success){
           
        }
        else {
            toast.error(resp1.msg,{
                autoClose:4000,
                pauseOnHover:true,
                closeOnClick:true
            })
        }
    }
    const compare=(t1,t2,t3,t4)=>{
        if(t1>t3)return true;
        else if(t1<t3)return false;
        else if(t1==t3 && t2<t4)return false;
        else return true;
    }
    const handleQuiz=(date,time,id)=>{
        const now = new Date();

// Get the current date and time components
let year = now.getFullYear()+'';
let month = now.getMonth() + 1+''; // Months are zero-indexed, so add 1
let day = now.getDate()+'';
let hours = now.getHours();
let minutes = now.getMinutes();
if(month.length==1)month='0'+month;
if(day.length==1)day='0'+day;
const l1=year+'-'+month+'-'+day;
let [t1,t2]=time.split(':')
t1=parseInt(t1);
t2=parseInt(t2);
let t3=parseInt(hours);
let t4=parseInt(minutes);
if(l1!=date || (l1==date && compare(t1,t2,t3,t4))){
    toast.error('Please start at scheduled time',{
        autoClose:4000,
            pauseOnHover:true,
            closeOnClick:true
    });
    return;
}
    else {
      navigate('/eventmain',{state:{eventId:id,user:user1}});
       return;
    }
    }
    const handleResult=async (eventId)=>{
        navigate('/result',{state:{eventId:eventId}})
    }
  return (
    <div>
    <Navbar1 visible={visible} setVisible={setVisible}/>
    <div className='flex gap-2 mt-5'>
        <div className='m-0 p-0 hidden lg:block'>
      <Sidebar1/>
      </div>
      <div className='w-full rounded-md bg-[#CCEFFF] lg:mr-3 z-0'>
      <header id="site-header" className="my-auto site-header valign-center"> 
        <div className="intro">
    <div className=' py-[25vh]'>
            <h2 className='text-xl sm:text-3xl font-semibold'>{events.length?events[0].date:''} / {events.length?events[0].college:''}</h2>
            
            <h1 className='text-[#315EFF] text-3xl sm:text-5xl font-bold'>{events.length?events[0].eventName:''}</h1>
            
            <p className='text-xl sm:text-3xl font-semibold'>First &amp; Largest Event To Find A Leader In You</p>
        
                {events.map((e1,ind)=>{
                return (
                    <div className='h-16 mt-2'>
                     {finish[ind]?(
                        <>
                        {/* <button  className='px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>See Result</button> */}
                        
                        <button className="blob-btn" onClick={()=>{handleResult(e1._id)}}>
                          See Result
                          <span className="blob-btn__inner">
                            <span className="blob-btn__blobs">
                              <span className="blob-btn__blob"></span>
                              <span className="blob-btn__blob"></span>
                              <span className="blob-btn__blob"></span>
                              <span className="blob-btn__blob"></span>
                            </span>
                          </span>
                        </button>
                        <br/>
                      
                      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <defs>
                          <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
                            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                          </filter>
                        </defs>
                      </svg>
                      </>
                     ): (
                        <>
                        {
                            <>
                            {/* <button   className='px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Take Quiz</button> */}
                           
                        <button className="blob-btn" onClick={()=>{handleQuiz(e1.date,e1.time,e1._id)}}>
                          Enter Event
                          <span className="blob-btn__inner">
                            <span className="blob-btn__blobs">
                              <span className="blob-btn__blob"></span>
                              <span className="blob-btn__blob"></span>
                              <span className="blob-btn__blob"></span>
                              <span className="blob-btn__blob"></span>
                            </span>
                          </span>
                        </button>
                        <br/>
                      
                      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <defs>
                          <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
                            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                          </filter>
                        </defs>
                      </svg>
                            </>
                      }
                      </>
                      )}
                    </div>
                )
            })}
                      </div>

            </div>
    </header>
        <div className='flex flex-wrap'>
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

export default Dashboard1
