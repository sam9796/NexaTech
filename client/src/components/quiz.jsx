import React,{useState,useEffect} from 'react'
import Navbar1 from './navbar2'
import Sidebar1 from './sidebar1'
import Bell from '../assets/Icon.png'
import Flag from '../assets/Flag.png'
import Man from '../assets/man.png'
import { useLocation,useNavigate } from 'react-router-dom'
import mqtt from 'mqtt'

const mqttClient=mqtt.connect('ws://65.2.179.139:9001/mqtt', {
  username: 'gwortssh',
  password: 'F3Ce-SNdObpe',
})
function IndiOpt(params){
    const {ind,v1,id,check,setCheck,submit}=params
    const handlePublish=(id,ind,inc)=>{
        mqttClient.publish(`${id}/${ind}`,JSON.stringify({val:inc}))
    }
    return (
        <>
        <input type="radio" name={id} checked={ind==check}  value={`${ind}`} disabled={submit} onChange={(e)=>{
            handlePublish(id,check,-1)
            setCheck(ind)
            handlePublish(id,ind,1); }}  className='mr-2'/>
        <label htmlFor="option">{v1}</label>
        <br />
        </>
    )
}

function IndiOpt1(params){
    const {ind,id,v1,val,setVal,submit}=params
    const handlePublish=(id,ind,inc)=>{
        mqttClient.publish(`${id}/${ind}`,JSON.stringify({val:inc}))
    }
    const [checked,setChecked]=useState(false);
    useEffect(()=>{
        setChecked(val[ind]);
    },[checked])
    return (
        <>
        <input type="checkbox" value={`${ind}`} checked={submit?val[ind]:checked} disabled={submit} onChange={(e)=>{
            let k1=val;
            k1[ind]=e.target.checked;
            setVal(k1)
            setChecked(e.target.checked)
            if(e.target.checked)handlePublish(id,ind,1)
            else handlePublish(id,ind,-1); }} className='mr-2'/>
        <label htmlFor="option">{v1}</label>
        <br />
        </>
    )
}

function IndiQues(params){
    const {q1,ind1,eventId}=params
    const [check1,setCheck1]=useState(-1);
    const [val,setVal]=useState([]);
    const [val1,setVal1]=useState('')
    const [submit,setSubmit]=useState(false)
    const [check,setCheck]=useState(false)
    useEffect(()=>{
        let k1=[]
        if(q1.type=='multiple'){
            for(let i=0;i<q1.options.length;++i){
                k1.push(false);
            }
            setVal(k1);
        }
        const getQues=async ()=>{
            const resp1=await fetch('http://3.110.223.82:8000/getPart',{
                method:'POST',   
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':localStorage.getItem('token1')
                },
                body:JSON.stringify({eventId:eventId,id:q1._id})        
             })
            const resp2=await resp1.json();
            if(resp2.success){
                if(resp2.k2){
                    setSubmit(resp2.k2);
                    setCheck(resp2.k1);
                    if(q1.type=='dropdown' || q1.type=='descriptive'){
                        setVal1(resp2.k3);
                    }
                    else {
                       if(q1.type=='multiple') for(let j=0;j<resp2.k3.length;++j){
                            let k16=parseInt(resp2.k3[j])
                            k1[k16]=true;
                            setVal(k1);
                        }
                        else setCheck1(parseInt(resp2.k3))
                    }
                }
            }
        }
        getQues();
    },[])
    const handlePublish=(id,ind,inc)=>{
        mqttClient.publish(`${id}/${ind}`,JSON.stringify({val:inc}))
    }
    const handleSubmit=async ()=>{
        let v1;
        if(q1.type=='multiple')v1=val;
        else if(q1.type=='single')v1=check1;
        else v1=val1;
        const resp=await fetch('http://3.110.223.82:8000/checkques',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token1')
            },
            body:JSON.stringify({ques:q1,resp:v1})
        })
        const resp1=await resp.json();
        if(resp1.success){
                setSubmit(true);
                if(resp1.check)setCheck(true);
        }
    }
    return (
        <div className='my-5 mx-10'>
    <div className='mt-4'>Q{ind1+1}</div>
    <div className='mt-1 rounded-md px-4 py-2 bg-white mb-4 flex justify-between'>
        <div>
        {q1.description}</div>
        </div>

    { q1.type=='single' && q1.options.map((v1,ind)=>
    {
        return (
            <IndiOpt id={q1._id} v1={v1} ind={ind} check={check1} submit={submit} setCheck={setCheck1}/>
        )
    })
    }
    {q1.type=='multiple' && q1.options.map((v1,ind)=>
    {
        return <IndiOpt1 ind={ind} v1={v1} id={q1._id} val={val} submit={submit} setVal={setVal}/>
    })
    }
    {q1.type=='dropdown' && (
        <select name="dropdown" value={val1} disabled={submit} onChange={(e)=>{setVal1(e.target.value)}} className='outline-none border-none px-4 py-2 rounded-md'>
        {q1.options.map((v1,ind)=>
    {
        return (
            <>
            <option value={v1}>{v1}</option>
            </>
        )
    })}
    </select>
    )
    }
    {q1.type=='descriptive'  && (<input value={val1} disabled={submit} onChange={(e)=>{setVal1(e.target.value)}} className='p-2 mx-1 rounded-md bg-white'/>)}
    {q1.eventId!='660e9851132c16d83a65f910' && submit && 
        (check?(
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

        ):(
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

        ))
        
    }
    {!submit && <button onClick={()=>{handleSubmit()}} className='px-6 py-2 mx-10 my-5 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>POST</button>}
    </div>
    )
}

function Quiz() {
    const [ques,setQues]=useState([])
    const [resp,setResp]=useState([])
    const [check,setCheck]=useState([])
    const [submit,setSubmit]=useState(false)
    const [id,setId]=useState('')
    const [user,setUser]=useState('')
    const [visible,setVisible]=useState(false);
    const locate=useLocation();
    const navigate=useNavigate()
    useEffect(() => {
        // Prompt confirmation when reload page is triggered
        window.onbeforeunload = () => { return "" };
            
        // Unmount the window.onbeforeunload event
        return () => { window.onbeforeunload = null };
    }, []);
    const handleClick=async ()=>{
        const resp1=await fetch('http://3.110.223.82:8000/checkQues1',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token1')
            },
            body:JSON.stringify({eventId:locate.state.eventId})
        })
        const resp2=await resp1.json();
        if(resp2.success){
            navigate('/dashboard1')
        }
        else {
            toast.error('Unable to submit',{
                autoClose:4000,
                pauseOnHover:true,
                closeOnClick:true
            })
        }
    }
    const postQues=async (m)=>{const resp1=await fetch('http://3.110.223.82:8000/postQues',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token1')
        },
        body:JSON.stringify({eventId:locate.state.eventId,id:m._id})
       })
       const resp2=await resp1.json();
       if(resp2.success){
        let k5=[];
        for(let i=0;i<resp2.ques.length;++i){
            const res1=await fetch('http://3.110.223.82:8000/getQues1',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':localStorage.getItem('token1')
                },
                body:JSON.stringify({quesId:resp2.ques[i]})
            })
            const res2=await res1.json();
            if(res2.success){
                k5.push(res2.ques);
            }
        }
        setQues(k5);
       }
    }
    const handle=async ()=>{
        const resp=await fetch('http://3.110.223.82:8000/getData1',{
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
        mqttClient.on('connect', () => {
          })
          mqttClient.subscribe(`${locate.state.user}/state`);
   mqttClient.on('message', (topic, message) => {
       switch (topic) {
           case `${locate.state.user}/state`:                                                           
               let m = JSON.parse(message.toString());
            postQues(m);
               break;
           default:
       }
   });
    },[])
  return (
    <div>
    <Navbar1 setVisible={setVisible} visible={visible}/>
    <div className='flex gap-2 mt-5'>
    <div className='m-0 p-0 hidden lg:block'>
      <Sidebar1/>
      </div>
      <div className='w-full rounded-md bg-[#CCEFFF]'>
      {ques.map((q1,ind1)=>{
        
        return (  <IndiQues q1={q1} ind1={ind1} eventId={locate.state.eventId}/> )
        })}
        <button onClick={()=>{handleClick()}} className='px-6 py-2 mx-10 my-5 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Submit</button>
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

export default Quiz
