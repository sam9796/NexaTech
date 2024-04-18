import React,{useState,useEffect,useRef} from 'react'
import Navbar1 from './navbar2'
import Sidebar1 from './sidebar1'
import Bell from '../assets/Icon.png'
import Flag from '../assets/Flag.png'
import Man from '../assets/man.png'
import { useLocation,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useGlobalState } from './context'

function IndiOpt(params){
    const {ind,v1,id,check,setCheck,submit}=params
    return (
        <>
        <input type="radio" name={id} checked={check==ind}  value={`${ind}`} disabled={submit} onChange={(e)=>{
            setCheck(ind) }}  className='mr-2'/>
        <label htmlFor="option">{v1}</label>
        <br />
        </>
    )
}

function IndiOpt1(params){
    const {ind,id,v1,val,setVal,submit}=params
    const [checked,setChecked]=useState(false);
    useEffect(()=>{
        setChecked(val[ind]);
    },[checked])
    return (
        <>
        <input type="checkbox" value={`${ind}`} checked={submit?val[parseInt(ind)]:checked} disabled={submit} onChange={(e)=>{
            let k1=val;
            k1[parseInt(ind)]=e.target.checked;
            setVal(k1)
            setChecked(e.target.checked) }} className='mr-2'/>
        <label htmlFor="option">{v1}</label>
        <br />
        </>
    )
}
function IndiOpt22(params){
    const {ind,ind1,submit,val,setVal}=params
    return (
                                <th className='px-1'>
                                    <input type="radio" name={ind}  disabled={submit} onChange={(e)=>{
                                        val[parseInt(ind)]=ind1;
                                        setVal(val);
                                    }}/>
                                </th>
    )
}
function IndiOpt21(params){
    const {ind,submit,q1,horz,val,setVal}=params
    return(
                <tr>
                        <th>{q1}</th>
                        {horz.map((q2,ind1)=>{
                            return (
                                <IndiOpt22 ind={ind} ind1={ind1} submit={submit} val={val} setVal={setVal}/>
                            )
                        })}
                    </tr>
    )
}
function IndiOpt32(params){
    const {ind,submit,val,setVal,ind1}=params
    const [check,setCheck]=useState(false)
    return (
                                <th className='px-1'>
                                    <input type="checkbox" checked={check} name={ind} disabled={submit}
                                    onChange={(e)=>{
                                        setCheck(e.target.checked)
                                        val[parseInt(ind)][parseInt(ind1)]=(e.target.checked);
                                        setVal(val);
                                    }}
                                    />
                                </th>
    )
}
function IndiOpt31(params){
    const {ind,submit,q1,horz,val,setVal}=params
    return(
                <tr>
                        <th>{q1}</th>
                        {horz.map((q2,ind1)=>{
                            return (
                                <IndiOpt32 ind={ind} ind1={ind1} submit={submit} val={val} setVal={setVal} />
                            )
                        })}
                    </tr>
    )
}
function IndiOpt2(params){
    const {q1,submit,id,val,setVal,setSubmit,eventId}=params;
    const [horz,setHorz]=useState([]);
    const [vert,setVert]=useState([]);
    const getQues=async (p7)=>{
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
                let i1=resp2.k3;
                for(let i=0;i<i1.length;++i){
                    p7[i]=parseInt(i1[i]);
                }
            }
            return p7;
        }
    }
    const handle=async ()=>{
        let p1=q1.options;
        let p3=false;
        let p4=[];
        let p5=[];
        for(let i=0;i<p1.length;++i){
            let p2=p1[i].split(':');
            if(p2.length>1){
                p4.push(p2[0]);
                p5.push(p2[1]);
                p3=true;
            }
            else{
                if(p3)p5.push(p1[i]);
                else p4.push(p1[i]);
            }
        }
        setHorz(p4);
        setVert(p5);
        let p6=[];
        for(let j=0;j<p5.length;++j){
        p6.push(-1);
    }
    p6=await getQues(p6)
    setVal(p6);
    }
    useEffect(()=>{
        handle();
    },[])
    return (
        <>
        <table>
            <tr>
                <th></th>
                {
                    horz.map((q1)=>{
                        return (
                            <th className='px-1'>{q1}</th>
                        )
                    })
                }
            </tr>
            {vert.map((q1,ind)=>{
                return (
                    <IndiOpt21 q1={q1} ind={ind} horz={horz} submit={submit} val={val} setVal={setVal}/>
                )
            })}
        </table>
        </>
    )
}
function IndiOpt3(params){
    const {q1,submit,id,val,setVal,setSubmit,eventId}=params;
    const [horz,setHorz]=useState([]);
    const [vert,setVert]=useState([]);
    const getQues=async (p7)=>{
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
                let i1=resp2.k3.split(':');
                for(let i=0;i<i1.length;++i){
                    for(let j=0;j<i1[i].length;++j){
                        let t1=parseInt(i1[i][j]);
                        p7[i][t1]=true;
                    }
                }
            }
            return p7;
        }
    }
    const handle=async()=>{
        let p1=q1.options;
        let p3=false;
        let p4=[];
        let p5=[];
        for(let i=0;i<p1.length;++i){
            let p2=p1[i].split(':');
            if(p2.length>1){
                p4.push(p2[0]);
                p5.push(p2[1]);
                p3=true;
            }
            else{
                if(p3)p5.push(p1[i]);
                else p4.push(p1[i]);
            }
        }
        setHorz(p4);
        setVert(p5);
        let p6=[];
        let p7=[];
        for(let j=0;j<p5.length;++j){
            p6=[];
        for(let i=0;i<p4.length;++i){
            p6.push(false);
        }
        p7.push(p6);
    }
    p7=await getQues(p7);
    setVal(p7);
    }
    useEffect(()=>{
        handle();
    },[])
    return (
        <>
        <table>
            <tr>
                <th></th>
                {
                    horz.map((q1)=>{
                        return (
                            <th className='px-1'>{q1}</th>
                        )
                    })
                }
            </tr>
            {vert.map((q1,ind)=>{
                return (
                   <IndiOpt31 q1={q1} ind={ind} horz={horz} submit={submit} val={val} setVal={setVal}/>
                )
            })}
        </table>
        </>
    )
}

function IndiOpt4(params){
    const {id,val,submit,check,setCheck,ind}=params
    return (
        <div>
        <input type="radio" name={id} checked={ind==check}   disabled={submit} onChange={(e)=>{
            setCheck(ind) }}  className='mr-2'/>
        <br/>
        <label htmlFor="option">{val}</label>
        </div>
    )
}

function IndiQues(params){
    const {q1,ind1,eventId,timer}=params
    const [check1,setCheck1]=useState(-1);
    const [val,setVal]=useState([]);
    const [val1,setVal1]=useState('')
    const [submit,setSubmit]=useState(false)
    const buttonRef = useRef(null);
    useEffect(()=>{
        let k1=[]
        if(q1.type=='multiple'){
            for(let i=0;i<q1.options.length;++i){
                k1.push(false);
            }
            setVal(k1);}
        },[])

    const handleSubmit=async ()=>{
        let v1;
        if(q1.type=='multiple' || q1.type=='grid' || q1.type=='multigrid')v1=val;
        else if(q1.type=='single' || q1.type=='linear')v1=check1;
        else v1=val1;
        if(q1.type=='single' || q1.type=='linear'){
            if(v1==-1){
                toast.error('Respond to all the questions',{
                    autoClose:4000,
                    pauseOnHover:true,
                    closeOnClick:true
                })
            }
        }
        if(q1.type=='grid'){
            for(let i in v1){
                if(i==-1){
                    toast.error('Respond to all the questions',{
                        autoClose:4000,
                        pauseOnHover:true,
                        closeOnClick:true
                    })
                }
            }
        }
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
        }
    }
    const handleSubmit1=async ()=>{
        let v1;
        console.log(val,check1,val1)
        if(q1.type=='multiple' || q1.type=='grid' || q1.type=='multigrid')v1=val;
        else if(q1.type=='single' || q1.type=='linear')v1=check1;
        else v1=val1;
        if(q1.type=='single' || q1.type=='linear'){
            if(v1==-1){
                toast.error('Respond to all the questions',{
                    autoClose:4000,
                    pauseOnHover:true,
                    closeOnClick:true
                })
            }
        }
        if(q1.type=='grid'){
            for(let i in v1){
                if(i==-1){
                    toast.error('Respond to all the questions',{
                        autoClose:4000,
                        pauseOnHover:true,
                        closeOnClick:true
                    })
                }
            }
        }
        const resp=await fetch('http://3.110.223.82:8000/checkques1',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token1')
            },
            body:JSON.stringify({ques:q1,resp:v1})
        })
        const resp1=await resp.json();
        
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
    {q1.type=='descriptive'  && (<input value={val1} disabled={submit} onChange={(e)=>{setVal1(e.target.value)}} className='p-2 mx-1 rounded-md bg-white'/>
    )}
    {q1.type=='grid' && <IndiOpt2 id={q1._id} q1={q1} submit={submit} val={val} setVal={setVal}/>}
    {q1.type=='multigrid' && <IndiOpt3 id={q1._id} q1={q1} eventId={eventId} submit={submit} setSubmit={setSubmit} val={val} setVal={setVal}/>}
    <div className='flex flex-wrap gap-2'>
    {q1.type=='linear' && q1.options.map((i1,ind)=>{
        return <IndiOpt4 val={i1} id={q1._id} check={check1} eventId={eventId} setCheck={setCheck1} setSubmit={setSubmit} submit={submit} ind={ind}/>
    })}</div>
    {/* {q1.eventId!='660e9851132c16d83a65f910' && submit && 
        (check?(
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

        ):(
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

        ))
        
    } */}
    {!submit && <button onClick={()=>{handleSubmit()}} className=' px-6 py-2 mx-10 my-5 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Save</button>}
    </div>
    )
}

function Quiz(params) {
    const {id1,q1,time,setVis}=params
    const [ques,setQues]=useState([])
    const [user,setUser]=useState('')
    const [clock,setClock]=useState(0)
    const [current,setCurrent]=useState(1)
    const [total,setTotal]=useState(0)
    const locate=useLocation();
    const navigate=useNavigate();
    const { globalState, setGlobalState } = useGlobalState();
    
    const handle2=()=>{
        let q4=[]
         for(let i=0;i<q1.length;++i)q4.push(q1[i]._id)
           handle1(q4);
           
    }
    const handle1=async (m)=>{
        const resp1=await fetch('http://3.110.223.82:8000/postQues',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token1')
        },
        body:JSON.stringify({eventId:id1,id:m})
       })
       const resp2=await resp1.json();
       return resp2.success;
    }

    useEffect(() => {
        setTotal(q1.length)
        handle2();
        setQues(q1)
        if(time.length>0){
            let t1=parseInt(time);
            handleTimer(t1);
        }
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
            body:JSON.stringify({eventId:id1})
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

    const handleTimer=(minutes)=>{
        let interval;
        localStorage.removeItem('currentTime')
        localStorage.removeItem('targetTime')
        let currentTime = localStorage.getItem('currentTime');
let targetTime = localStorage.getItem('targetTime');
if (targetTime == null && currentTime == null) {
  currentTime = new Date();
  targetTime = new Date(currentTime.getTime() + (minutes * 60000));
  localStorage.setItem('currentTime', currentTime);
  localStorage.setItem('targetTime', targetTime);
}
else{
  currentTime = new Date(currentTime);
  targetTime = new Date(targetTime);
}

if(!checkComplete()){
  interval = setInterval(checkComplete, 1000);
}

function checkComplete() {
  if ( (currentTime > targetTime) || globalState) {
    clearInterval(interval);
    localStorage.removeItem('currentTime')
    localStorage.removeItem('targetTime')
  } else {
    currentTime = new Date();
    setClock(targetTime-currentTime)
  }
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
      },[])
      const handleClick1=()=>{
        setVis(false)
        localStorage.removeItem('currentTime')
        localStorage.removeItem('targetTime')
      }
    
  return (
    <div>
      <div className='w-full rounded-md bg-[#CCEFFF]'>
        {clock>0 && <div className='m-3'>
            <h1 className='text-3xl font-bold'>Time Left: {Math.floor(clock/60000)}:{(Math.floor((clock/1000)%60)) < 10 ? `0${Math.floor((clock/1000)%60)}` : Math.floor((clock/1000)%60)}</h1>
        </div>}
       <IndiQues q1={ques.length?ques[current-1]:''} ind1={current-1} eventId={id1} timer={time}/>
    <div className='w-full flex justify-between'>
    <button onClick={()=>{setCurrent(current-1)}} disabled={current==1} className='px-6 py-2 mx-10 my-5 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Prev</button>
    <button onClick={()=>{setCurrent(current+1)}} disabled={current==total} className='px-6 py-2 mx-10 my-5 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Next</button>  
    </div>
     <button onClick={()=>{handleClick1()}} className='px-6 py-2 mx-10 my-5 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Submit</button>
      </div>
  </div>
  )
}

export default Quiz
