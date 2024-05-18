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
    const [visible,setVisible]=useState(true);
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
        const resp=await fetch('http://localhost:8000/getAllEvents2',{
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
  
    useEffect(()=>{
        getAll();
    handle();
    },[])

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
                    
                        <button onClick={()=>{handleResult(e1._id)}} className='px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>See Result</button>
                    
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
