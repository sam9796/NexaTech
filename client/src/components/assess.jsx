import React,{useState,useRef,useEffect} from 'react'
import Navbar from './navbar'
import Sidebar from './sidebar'
import Mask from '../assets/Mask.png'
import Cover from '../assets/cover.jpg'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import Bell from '../assets/Icon.png'
import Flag from '../assets/Flag.png'
import Man from '../assets/man.png'

function Assess() {
    const [createEvent,setCreateEvent]=useState(false)
    const [event,setEvent]=useState('')
    const [events,setEvents]=useState([])
    const [editEvent,setEditEvent]=useState(false)
    const [id,setId]=useState('')
    const [visible,setVisible]=useState(true);
    const [timer,setTimer]=useState('')
    const [id1,setId1]=useState('')
    const [desc,setDesc]=useState('')
    const navigate=useNavigate()
   
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
            setId1(resp1.user);
        }
        else {
            
        }
    }
    const getData=async ()=>{
        const resp=await fetch('http://3.110.223.82:8000/getQuizzes1',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            }
        })
        const resp1=await resp.json();
        if(resp1.success){
            setEvents(resp1.quiz);
        }else {
            toast.error('Unable to load quiz',{
                autoClose:4000,
                pauseOnHover:true,
                closeOnClick:true
            })
        }
    }
    useEffect(()=>{
        handle();
        
        getData();
    },[])
    
    
    const handleClick=async ()=>{
       if(event.length==0){
        toast.error('Please enter all the details',{
            autoClose:4000,
    pauseOnHover:true,
    closeOnClick:true
        })
        return;
       }
       const resp=await fetch('http://3.110.223.82:8000/saveQuiz1',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({
            event:event,
            timer:timer,
            description:desc
        })
       })
       const resp1=await resp.json();
       if(resp1.success){
        toast.success(resp1.msg,{autoClose:4000,
            pauseOnHover:true,
            closeOnClick:true})
            setEvent('')
            navigate('/dashboard')
       }
       else {
        toast.error(resp1.msg,{autoClose:4000,
            pauseOnHover:true,
            closeOnClick:true
        })
       }
    }
    const handleDelete=async (id)=>{
        const resp=await fetch('http://3.110.223.82:8000/deleteQuiz',{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({id:id})
        })
        const resp1=await resp.json()
        if(resp1.success){
            toast.success('Deleted Successfully',{
                autoClose:4000,
            pauseOnHover:true,
            closeOnClick:true
            })
            navigate('/dashboard')
        }
        else {
            toast.error('Unable to delete',{
                autoClose:4000,
            pauseOnHover:true,
            closeOnClick:true
            })
        }
    }
    const handleEdit=async(e1)=>{
        setEditEvent(true)
        setEvent(e1.name);
        setTimer(e1.timer)
        setDesc(e1.description)
        setId(e1._id)
    }
    const handleEditEvent=async ()=>{
        if(event.length==0){
            toast.error('Please enter all the details',{
                autoClose:4000,
        pauseOnHover:true,
        closeOnClick:true
            })
            return;
           }
           const resp=await fetch('http://3.110.223.82:8000/editQuiz',{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({
                id:id,
                name:event,
                timer:timer,
                description:desc
            })
           })
           const resp1=await resp.json();
           if(resp1.success){
            toast.success(resp1.msg,{autoClose:4000,
                pauseOnHover:true,
                closeOnClick:true})
                setEvent('');
                setEditEvent(false)
                setTimer('')
                setDesc('')
                navigate('/dashboard')
           }
           else {
            toast.error(resp1.msg,{autoClose:4000,
                pauseOnHover:true,
                closeOnClick:true
            })
           }
    }
    const handleNavigate=async (e,e1)=>{
        e.preventDefault();
        navigate('/indiAssess',{state:e1})
    }
  return (
    <div>
      <Navbar visible={visible} setVisible={setVisible}/>
      <div className='flex gap-2 mt-5'>
      <div className='m-0 p-0 hidden lg:block'>
        <Sidebar/>
        </div>
        <div className='w-full rounded-md bg-[#CCEFFF] p-5'>
        {(createEvent||editEvent) ?(
            <div>
                <div className='text-3xl font-semibold'>Add New Assessment</div>
                <div className='mt-5 bg-white rounded-xl flex flex-col items-center justify-center py-20'>
                    <div className='w-full  mt-10'>
                        <div className='mx-auto w-5/6 md:w-1/2 lg:w-1/3'>
                            <div className='text-center'>Assessment Name</div>
                            <input type="text" value={event} onChange={(e)=>{setEvent(e.target.value)}} className='w-full p-2 rounded-lg outline-none  bg-[#EEF2FF] border border-[#315EFF] '
                            placeholder='Enter Quiz Name'/>
                        </div>
                        <div className='mx-auto w-5/6 md:w-1/2 lg:w-1/3'>
                            <div className='text-center'>Timer</div>
                            <input type="text" value={timer} onChange={(e)=>{setTimer(e.target.value)}} className='w-full p-2 rounded-lg outline-none  bg-[#EEF2FF] border border-[#315EFF] '
                            placeholder='Enter Timer'/>
                        </div>
                        <div className='mx-auto w-5/6 md:w-1/2 lg:w-1/3'>
                            <div className='text-center'>Description</div>
                            <input type="text" value={desc} onChange={(e)=>{setDesc(e.target.value)}} className='w-full p-2 rounded-lg outline-none  bg-[#EEF2FF] border border-[#315EFF] '
                            placeholder='Enter Description'/>
                        </div>
                    </div>
                    {createEvent && (<button onClick={()=>{handleClick()}}className=' mt-10 px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Save Assessment</button>)}
                    {editEvent && (<button onClick={()=>{handleEditEvent()}}className=' mt-10 px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Edit Assessment</button>)}
                </div>
            </div>
        ):(<div>
            <div className='flex flex-wrap'>
            {events.map((e1)=>{
                return (
                    <div className="bg-white responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container rounded-xl">
                    <div className="card rounded-xl">
                      <div className="team-image-wrapper">
                        <img className="team-member-image h-full" src={Cover}/>
                      </div>
                      <p className="text-blk name">
                        {e1.name}
                      </p>
                      <p className="">
                        {e1.timer}
                      </p>
                      <p className="mt-1">
                        {e1.description}
                      </p>
                      <div className="mx-auto">
                      {/* <svg onClick={()=>{handleDelete(e1._id)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="cursor-pointer w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg> */}
                        <svg onClick={()=>{handleEdit(e1)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="cursor-pointer w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
                      </div>
                      {/* <a onClick={(e)=>{handleNavigate(e,e1)}} className='mt-3 text-sm cursor-pointer' style={{textDecoration:'underline'}}>Read More</a> */}
                    </div>
                  </div>
                )
            })}
            </div>
            <button onClick={()=>{setCreateEvent(true)}} className='px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Create Assessment</button>
            </div>)
        }
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
            <div className='text-md font-semibold my-auto'>{id1}</div>
        
        </div>
        <div>Admin</div>
        </div>
        <Sidebar/>
        </div>
      </div>
    </div>
  )
}

export default Assess
