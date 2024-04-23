import React,{useState,useEffect} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import cover from '../assets/cover.jpg'
import Navbar from './navbar';
import Sidebar from './sidebar';
import { toast } from 'react-toastify';
import {QRCodeCanvas} from 'qrcode.react';
import mqtt from 'mqtt'
import MyChart from "./mychart.jsx";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Piechart from './piechart.jsx';
import Linechart from './linechart.jsx';
import Bell from '../assets/Icon.png'
import Flag from '../assets/Flag.png'
import Man from '../assets/man.png'
Chart.register(CategoryScale);

const mqttClient=mqtt.connect('ws://65.2.179.139:9001/mqtt', {
  username: 'gwortssh',
  password: 'F3Ce-SNdObpe',
})
function IndiOpt(params){
    const {v1,ind,id,val,setVal,def}=params
    let [opt,setOpt]=useState(0);
    
    return (<div className='flex gap-2'><div className='my-2 p-2 mx-1 rounded-md bg-white'>{v1}</div>
    <div className='my-auto'>{def?(def):(opt)}</div>
    </div>)
}

function IndiOpt3(params){
    const {q1}=params;
    const [horz,setHorz]=useState([]);
    const [vert,setVert]=useState([]);
    const handle=()=>{
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
                    horz.map((q3)=>{
                        return (
                            <th className='px-1'>{q3}</th>
                        )
                    })
                }
            </tr>
            {vert.map((q3,ind)=>{
                return (
                    <tr>
                        <th>{q3}</th>
                        {horz.map((q2,ind1)=>{
                            return (
                                <th className='px-1'>
                                    {q1.count.length?q1.count[(horz.length)*ind+ind1]:0}
                                </th>
                            )
                        })}
                    </tr>
                )
            })}
        </table>
        </>
    )
}
function IndiOpt4(params){
    const {visible,q1,val}=params;
    const [horz,setHorz]=useState([]);
    const [vert,setVert]=useState([]);
    const [data,setData]=useState([]);
    const [valChart,setvalChart]=useState('None')
    const handle=()=>{
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
    }
    useEffect(()=>{
        handle();
        setData(q1.count.slice(0,horz.length))
    },[])
    const handleGraph=(val1)=>{
        setData(q1.count.slice(val1*(horz.length),(val1+1)*(horz.length)));
    }
    return (
        <>
            <select name="chart" id="chart1" className='mt-4 py-2 px-4 rounded-md outline-none' value={valChart}
                onChange={(e)=>{setvalChart(e.target.value);handleGraph(e.target.value)}}>
                    {vert.map((p2,ind2)=>{
                        return (<option value={ind2}>{p2}</option>)
                    })}
                </select>
        <div className={`${visible}`}>
            {val=='bar' && <MyChart chartData={{labels:horz,datasets:[{
                labels:'No. of participants',
                data:data}] }} visibility={visible}/>}
            {val=='pie' && <Piechart chartData={{labels:horz,datasets:[{
                labels:'No. of participants',
                data:data}] }} visibility={visible}/>}
            {val=='line' && <Linechart chartData={{labels:horz,datasets:[{
                labels:'No. of participants',
                data:data}] }} visibility={visible}/>}
                </div>
                </>
    )
}
function IndiQues(params){
    const {q1,ind,part,setEdit,setDesc,setOption,setType,setId,setId2,setAns}=params
    const [submit,setSubmit]=useState(false);
    const [val,setVal]=useState(Array(q1.options.length).fill(0));
    const [visible,setVisible]=useState('hidden')
    const [valChart,setvalChart]=useState('')
    
    const handlePublish=(q1)=>{
        let n=part.length
        for(let i=0;i<n;++i){
        mqttClient.publish(`${q1.eventId}/${part[i]}/state`,JSON.stringify(q1));}
    }
    const handleGraph=async ()=>{
        const resp=await fetch('http://3.110.223.82:8000/getGraph',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({id:q1._id,val:val})
        })
        const resp1=await resp.json();
        if(resp1.success){
            toast.success('Result saved successfully',{
                autoClose:4000,
                pauseOnHover:true,
                closeOnClick:true
            })
        }
    }
    const handleDelete=async (id)=>{
        const resp=await fetch('http://3.110.223.82:8000/deleteQues',{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({id:id})
        })
        const resp1=await resp.json();
        if(resp1.success){
            toast.success('Question deleted successfully',{
                autoClose:4000,
                pauseOnHover:true,
                closeOnClick:true
            })
            navigate('/event')
        }
        else {
            toast.error(resp1.msg,{
                autoClose:4000,
                pauseOnHover:true,
                closeOnClick:true
            })
        }
    }
    const handleEdit=async (q1)=>{
        const l1=q1.options.join(',');
        setEdit(true);
        setDesc(q1.description);
        setType(q1.type);
        setOption(l1);
        setId(q1._id);
        setAns(q1.resp)
            setId2(q1.eventId);
    }
    
    return (
        <>
        <div className='mt-4'>Q{ind+1}</div>
        <div className='mt-1 rounded-md px-4 py-2 bg-white mb-4 flex justify-between'>
            <div>
            {q1.description}</div>
            <div className='flex gap-2'>
            <svg onClick={()=>{handleDelete(q1._id)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="cursor-pointer w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
                    <svg onClick={()=>{handleEdit(q1)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="cursor-pointer w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
            </div>
            </div>
        {(q1.type!='grid' && q1.type!='multigrid') && q1.options.map((v1,ind)=>
        {return <IndiOpt v1={v1} ind={ind} id={q1._id} val={val} setVal={setVal} def={q1.count[q1.type=='descriptive'?0:ind]}/>})}
        { (q1.type=='grid' || q1.type=='multigrid') && <IndiOpt3 q1={q1}/>}
            <div className='flex gap-4 flex-wrap md:flex-nowrap'>
            {/* <div className='mt-2'>Correct.{" "+q1.correct}</div>
            <div>Incorrect.{" "+q1.incorrect}</div> */}
            
            {/* <button className='mt-10 px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Stop</button>
            <button onClick={()=>{handlePublish(q1)}} className='mt-10 px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Post</button>
            <button className='mt-10 px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'
            onClick={()=>{
                if(visible=='hidden')setVisible('visible')
                else setVisible('hidden')
            }}>{visible=='visible'?'Hide':'Show'} Graph</button> */}
            {/* <div className='mt-auto'>
                <select name="chart" id="chart" className='py-2 px-4 rounded-md outline-none' value={valChart}
                onChange={(e)=>{setvalChart(e.target.value);}}>
                    <option value="none">None</option>
                    <option value="pie">Pie Chart</option>
                    <option value="bar">Bar Chart</option>
                    <option value="line">Line Chart</option>
                </select>
            </div> */}
            </div>
            {/* {(q1.type!='grid' && q1.type!='multigrid') && <div className={`${visible}`}>
            {valChart=='bar' && <MyChart chartData={{labels:q1.options,datasets:[{
                labels:'No. of participants',
                data:q1.count}] }} visibility={visible}/>}
            {valChart=='pie' && <Piechart chartData={{labels:q1.options,datasets:[{
                labels:'No. of participants',
                data:q1.count}] }} visibility={visible}/>}
            {valChart=='line' && <Linechart chartData={{labels:q1.options,datasets:[{
                labels:'No. of participants',
                data:q1.count}] }} visibility={visible}/>}
                </div>}
            {(q1.type=='grid' || q1.type=='multigrid') &&
                <>
                <IndiOpt4 visible={visible} q1={q1} val={valChart}/>
                </>
                } */}
            </>
    )
}

function Write() {
    const l1=useLocation();
    const [event,setEvent]=useState({})
    const [ques,setQues]=useState([])
    const [addQues,setAddQues]=useState(false)
    const [edit,setEdit]=useState(false)
    const [visible,setVisible]=useState(true)
    const [id1,setId1]=useState('')
    const [quiz,setQuiz]=useState([])
    const [assess,setAssess]=useState([])
    const [quizSent,setQuizSent]=useState([])
    const [assessSent,setAssessSent]=useState([])
    const navigate=useNavigate()
    const [chat,setChat]=useState('')
    const [timer,setTimer]=useState('')
    const [qvalue,setQvalue]=useState('')
    const [type,setType]=useState('')
    const [desc,setDesc]=useState('')
    const [option,setOption]=useState('')
    const [id,setId]=useState('')
    const [response,setResponse]=useState('')
    const [id2,setId2]=useState('')

    const getAllQuiz=async ()=>{
        const resp=await fetch('http://3.110.223.82:8000/getQuizzes',{
            method:'GET',
            headers:{
                'auth-token':localStorage.getItem('token'),
                'Content-Type':'application/json'
            }
        })
        const resp1=await resp.json();
        if(resp1.success){
            setQuiz(resp1.quiz)
            setAssess(resp1.assess)
        }
    }
    



    const getAll=async ()=>{
        const resp=await fetch('http://3.110.223.82:8000/getAllQues',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({id:event._id})
        }) 
        const resp1=await resp.json();
        if(resp1.success){
            setQues(resp1.ques)
            setQuizSent(resp1.quizzes)
            setAssessSent(resp1.assess)
        }
        else {
            toast.error('Unable to load questions',{
                autoClose:4000,
                pauseOnHover:true,
                closeOnClick:true
            })
        }
    }
    useEffect(()=>{
        setEvent(l1.state)
        getAllQuiz();
    },[])
    useEffect(()=>{getAll();},[ques])

    
   const handleClick=async ()=>{
    const l1=option.split(',');
    if(desc.length==0 || ((type=='single' || type=='multiple' || type=='dropdown') && l1.length<=1) || response.length==0){
       
        toast.error('Please enter all the details',{
            autoClose:4000,
            pauseOnHover:true,
            closeOnClick:true
        });
        return;
    }
    const resp=await fetch('http://3.110.223.82:8000/addQues',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({
            quizId:'',
            eventId:event._id,
            description:desc,
            options:l1,
            type:type,
            response:response
        })
    })
    const resp1=await resp.json();
    if(resp1.success){
        toast.success('Question added successfully',{
            autoClose:4000,
            pauseOnHover:true,
            closeOnClick:true
        })
        setType('');setOption('');setDesc('');
        navigate('/event');
    }
    else {
        toast.error(resp1.msg,{
            autoClose:4000,
            pauseOnHover:true,
            closeOnClick:true
        })
    }
}


const handleEditClick=async ()=>{
    const l1=option.split(',');
    if(id2.length==0 || desc.length==0 || ((type=='single' || type=='multiple' || type=='dropdown') && l1.length<=1) || response.length==0){
        toast.error('Please enter all the details',{
            autoClose:4000,
            pauseOnHover:true,
            closeOnClick:true
        });
        return;
    }
    const resp=await fetch('http://3.110.223.82:8000/editQues',{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({
            id:id,
            description:desc,
            options:l1,
            type:type,
            response:response,
            quizId:'',
            eventId:id2
        })
    })
    const resp1=await resp.json();
    if(resp1.success){
        toast.success('Question edited successfully',{
            autoClose:4000,
            pauseOnHover:true,
            closeOnClick:true
        })
        setId('');
        setEdit(false);
        setType('');setOption('');setDesc('');setResponse('');
        navigate('/event');
    }
    else {
        toast.error(resp1.msg,{
            autoClose:4000,
            pauseOnHover:true,
            closeOnClick:true
        })
    }
}
    
    const handlePost=async (eventId)=>{
        const resp=await fetch('http://3.110.223.82:8000/postQues',{
            method:'POST',
            headers:{
                'auth-token':localStorage.getItem('token'),
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                eventId:eventId,
            })
        })
        const resp1=await resp.json();
        if(resp1.success){
            toast.success('Question Posted Successfully',{
                autoClose:4000,
                pauseOnHover:true,
                closeOnClick:true
            })
        }
        else {
            toast.error(resp1.msg,{
                autoClose:4000,
                pauseOnHover:true,
                closeOnClick:true
            })
        }
    }

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
    useEffect(()=>{
        handle();
    },[])
    
    const handleSend=()=>{
        let part=event.participant
        for(let i=0;i<part.length;++i){
            console.log(part[i])
            mqttClient.publish(`${event._id}/${part[i]}/inst`,JSON.stringify(chat));
        }
        setChat('');
        toast.success('Sent Successfully',{
            autoClose:4000,
            pauseOnHover:true,
            closeOnClick:true
        })
    }
    const handleGetQuiz=async ()=>{
        const resp=await fetch('http://3.110.223.82:8000/getQuiz1',{
            method:'POST',
            headers:{
                'auth-token':localStorage.getItem('token'),
                'Content-Type':'application/json'
            },
            body:JSON.stringify({id:event._id,quiz:qvalue})
        })
        const resp1=await resp.json();
        if(resp1.success){
           if(resp1.isit){ 
            let l4=quizSent
          l4.push(resp1.quiz)
          setQuizSent(l4)
          toast.success('Quiz Added Successfully',{
            autoClose:4000,
            pauseOnHover:true,
            closeOnClick:true
        })
        }
           else {
            let l4=assessSent
          l4.push(resp1.quiz)
          setAssessSent(l4)
          toast.success('Asseessment Added Successfully',{
            autoClose:4000,
            pauseOnHover:true,
            closeOnClick:true
        })
        }
          
        }
    }
    const clipBoard=()=>{
        navigator.clipboard.writeText(event._id);

  // Alert the copied text
  alert("Copied the EventId");
    }
    const handleDelete=async (id)=>{
        const resp=await fetch('http://3.110.223.82:8000/deleteQuizList',{
            method:'POST',
            headers:{
                'auth-token':localStorage.getItem('token'),
                'Content-Type':'application/json'
            },
            body:JSON.stringify({eventId:event._id,id:id})
        })
        const resp1=await resp.json();
        if(resp1.success){
            navigate('/event')
        }
    }
  return (
    <>
<div>
<Navbar visible={visible} setVisible={setVisible}/>
<div className='flex gap-2 mt-5'>
<div className='m-0 p-0 hidden lg:block'>
  <Sidebar/>
  </div>
  <div className='w-full mx-auto  rounded-md bg-[#CCEFFF]'>
      <div className='w-5/6 sm:w-3/4 md:w-1/2 my-5 mx-auto'>
  {/* <div className='text-4xl font-bold mt-3'>{event.eventName}</div>
<img src={cover} alt="" className='mt-4 rounded-xl'/>
<div className='mt-1 flex flex-row justify-around'>
  <div className='text-md sm:text-lg md:text-xl font-semibold text-gray-500'>{event.college+' '},{' '+event.place}</div>
  <div className='text-md sm:text-lg md:text-xl font-semibold text-gray-500'>{event.date+' '}{event.time}</div>
</div>
<p className='mt-5 text-lg'>{event.description}</p>
<div className='mt-5'></div>
<QRCodeCanvas value={`http://3.110.223.82:8000/register?event=${event._id}`}/>
<div className='mt-5'></div> */}
<div onClick={()=>{clipBoard()}} className='cursor-pointer inline font-semibold px-4 py-2 bg-[#315EFF] text-white rounded-md mb-10'>Copy QuizId</div>
<div className='mt-5'>Quiz List</div>

{quizSent.map((q1,ind)=>{
      return (  
        <div className='flex justify-between bg-white my-2 px-2 rounded-md'>
         <div className='px-4 py-2 my-2 rounded-md '>
            {ind+1}.{' '+q1.name}
         </div>
          <div className='my-auto'> 
          <svg onClick={()=>{handleDelete(q1._id)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="cursor-pointer w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
          </div>
          </div>
      )
  })}
<div className='mt-5'>Assessment List</div>

{assessSent.map((q1,ind)=>{
      return (  
        <div className='flex justify-between bg-white my-2 px-2 rounded-md'>
         <div className='px-4 py-2 my-2 rounded-md '>
            {ind+1}.{' '+q1.name}
         </div>
          <div className='my-auto'> 
          <svg onClick={()=>{handleDelete(q1._id)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="cursor-pointer w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
          </div>
          </div>
      )
  })}
{/* {!(event.finished) && (
  <>
  { stop?(
  <button onClick={()=>{handleStop(event._id)}} className=' mt-10 px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Stop Quiz</button>
):
  (<button onClick={()=>{handleQuiz(event._id,event.date,event.time)}} className=' mt-10 px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Start Quiz</button>)}</>) } */}
  { (addQues || edit) ? (<div className='mt-5'>
      <select className='outline-none py-2 px-4 rounded-md' name="ques" id="ques" onChange={(e)=>{setType(e.target.value)}}>
          <option value='none'>None</option>
          <option value="grid">Multiple Choice Grid</option>
          <option value="multigrid">Checkbox Grid</option>
          <option value="linear">Linear Scale</option>
          <option value='single'>Single Choice</option>
          <option value='multiple'>Multiple Choice</option>
          <option value='dropdown'>Dropdown</option>
          <option value='descriptive'>Descriptive</option>
      </select>
      <div className='text-lg font-medium mt-3'>Write Question</div>
      <textarea type="text" value={desc} onChange={(e)=>{setDesc(e.target.value)}} rows-4 className='outline-none border-none py-2 rounded-md px-2 w-full' ></textarea>
      <div className='text-lg font-medium mt-3'>Write Answers</div>
      <input type="text" className='outline-none border-none py-2 rounded-md px-2 w-full' value={response} onChange={(e)=>{setResponse(e.target.value)}} placeholder='Write Correct Answers'/>
      {(type==='single'||type==='multiple'||type==='dropdown' || type=='linear' || type=='grid' || type=='multigrid') && 
      <>
      <div className='text-lg font-medium mt-3'>Write Options</div>
      <input type="text" className='outline-none border-none py-2 rounded-md px-2 w-full' value={option} onChange={(e)=>{setOption(e.target.value)}} placeholder='Write Options Separated By Comma'/>
      </>
      }
      {addQues && <button onClick={()=>{handleClick()}} className=' mt-10 px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Save Question</button>}
      {edit && 
      <>
      <div className='text-lg font-medium mt-3'>EventId</div>
      <input type="text" className='outline-none border-none py-2 rounded-md px-2 w-full' value={id2} onChange={(e)=>{setId2(e.target.value)}} placeholder='Write Options Separated By Comma'/>   
      <button onClick={()=>{handleEditClick()}} className=' mt-10 px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Save Question</button>
      </>
      }
  </div>):
  (
      <>
  {ques.map((q1,ind)=>{
      return (  
      q1.quizId=='' && <IndiQues q1={q1} ind={ind} setId2={setId2} setAns={setResponse} part={event.participant} setDesc={setDesc} setOption={setOption} setEdit={setEdit} setType={setType}setId={setId}/>
      )
  })}
  <br/>
  <button onClick={()=>{setAddQues(true)}} className=' mt-10 px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Add Question</button>
  </>)}
  <br />
  <select name="quiz" id="quiz" className='outline-none py-2 px-4 rounded-md mt-5' value={qvalue} onChange={(e)=>{setQvalue(e.target.value)}}>
            <option value="0">None</option>
            {quiz.map((l1)=>{
                return (
                    <option value={l1._id}>{l1.name}</option>
                )
            })}
        </select>
        <br />
        <button onClick={()=>{if(qvalue!='0')handleGetQuiz()}} className=' mt-5 px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Get Quiz</button>
        <br/>
  <select name="quiz" id="quiz" className='outline-none py-2 px-4 rounded-md mt-5' value={qvalue} onChange={(e)=>{setQvalue(e.target.value)}}>
            <option value="0">None</option>
            {assess.map((l1)=>{
                return (
                    <option value={l1._id}>{l1.name}</option>
                )
            })}
        </select>
        <br />
        <button onClick={()=>{if(qvalue!='0')handleGetQuiz()}} className=' mt-5 px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Get Assessment</button>
        {/* <select name="quiz" id="quiz" className='outline-none py-2 px-4 rounded-md mt-5' value={qvalue} onChange={(e)=>{setQvalue(e.target.value)}}>
            <option value="0">None</option>
            {quiz.map((l1)=>{
                return (
                    <option value={l1._id}>{l1.name}</option>
                )
            })}
        </select>
        <br />
        <button onClick={()=>{if(qvalue!='0')handleGetQuiz()}} className=' mt-5 px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Get Quiz</button> */}
        {/* <div className='text-lg font-medium mt-10'>Write Instructions</div>
        <textarea type="text" value={chat} onChange={(e)=>{setChat(e.target.value)}} rows-4 className='outline-none border-none py-2 rounded-md px-2 w-full' ></textarea>
        <button onClick={()=>{handleSend()}} className=' mt-5 px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Send</button> */}
  </div>
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
</>
  )
}

export default Write