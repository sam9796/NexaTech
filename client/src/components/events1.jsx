import React,{useState,useEffect} from 'react'
import Navbar1 from './navbar2'
import Sidebar1 from './sidebar1'
import Cover from '../assets/cover.jpg'
import { toast } from 'react-toastify';
import Bell from '../assets/Icon.png'
import Flag from '../assets/Flag.png'
import Man from '../assets/man.png'
import { useNavigate,useLocation } from 'react-router-dom';

function Events1() {
    const [events,setEvents]=useState([])
    const [register,setRegister]=useState([])
    const [finish,setFinish]=useState([])
    const [user,setUser]=useState([])
    const navigate=useNavigate();
    const locate=useLocation()
    const [visible,setVisible]=useState(false);
    const [user1,setUser1]=useState('');
    const [id,setId]=useState('')
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
            setUser1(resp1.id);
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
    const getAll=async ()=>{
        const resp=await fetch('http://localhost:8000/getAllEvents',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token1')
            }
        })
        const resp1=await resp.json();
        if(resp1.success){
            if(!Array.isArray(resp1.events)){
                let p1=[{}]
                p1[0]=(resp1.events)
                setEvents(p1);
                setRegister([false])
            }
            else {
                setEvents(resp1.events)
                let arr=[];
                let f1=[]
                let n=resp1.events.length;
                let u1=resp1.user;
                setUser(u1)
                for(let i=0;i<n;++i){
                    if(resp1.events[i].participant.indexOf(u1)==-1){
                        arr.push(false);
                    }
                    else {arr.push(true);}
                    let l3=resp1.events[i]._id
                    const res1=await fetch('http://localhost:8000/isSubmitted',{
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
                }
                setFinish(f1);
                setRegister(arr);
            }
        }
        else {
            toast.error('Unable to load events',{
                autoClose:4000,
                pauseOnHover:true,
                closeOnClick:true
            })
        }
    }
    const handleAlp=async (event_id)=>{
        const res1=await fetch('http://localhost:8000/getEvent1',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token1')
            },
            body:JSON.stringify({eventId:event_id})
        })
        const res2=await res1.json();
        if(res2.success){
            handleQuiz(res2.event.date,res2.event.time,event_id)
        }
    }
    useEffect(()=>{
        getAll();
    handle();
    },[])
    useEffect(()=>{
        const queryParams = new URLSearchParams(location.search);
        const param1 = queryParams.get('event');
        if(param1){
            handleRegister(param1);
            handleAlp(param1);
        }
    },[])
    useEffect(()=>{
        if(locate.state){
            handleRegister(locate.state.event);
            handleAlp(locate.state.event);
        }  
    },[])
    const handleRegister=async (id)=>{
        const resp=await fetch('http://localhost:8000/registerParticipant',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token1')
            },
            body:JSON.stringify({id:id})
                })
        const resp1=await resp.json();
        if(resp1.success){
            toast.success('Registered Successfully',{
                autoClose:4000,
                pauseOnHover:true,
                closeOnClick:true
            })
        }
        else {
            toast.success(resp1.msg,{
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
      navigate('/quiz',{state:{eventId:id,user:user1}});
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
      <div className='w-full rounded-md bg-[#CCEFFF] lg:mr-3 py-5'>
        <div className='flex flex-wrap'>
      {events.map((e1,ind)=>{
                return (
                    <div className="bg-white responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container rounded-xl">
                    <div className="card rounded-xl">
                      <div className="team-image-wrapper">
                        <img className="team-member-image h-full" src={Cover}/>
                      </div>
                      <p className="text-blk name">
                        {e1.eventName}
                      </p>
                      <p className="text-blk feature-text mb-1">
                        {e1.college}
                      </p>
                      <p className="text-blk feature-text">
                        {e1.date+' '} at {' '+e1.time}
                      </p>
                     {finish[ind]?(
                        <button onClick={()=>{handleResult(e1._id)}} className='px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>See Result</button>
                     ): (
                        <>
                        {
                        register[ind] ? (
                            <button  onClick={()=>{handleQuiz(e1.date,e1.time,e1._id)}} className='px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Take Quiz</button>
                        ):(
                            <button  onClick={()=>{handleRegister(e1._id)}} className='px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Register</button>
                        )
                      }
                      </>
                      )}
                    </div>
                  </div>
                )
            })}
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

export default Events1
