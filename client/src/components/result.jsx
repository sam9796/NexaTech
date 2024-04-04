import React,{useState,useEffect} from 'react'
import Navbar1 from './navbar2'
import Sidebar1 from './sidebar1'
import Bell from '../assets/Icon.png'
import Flag from '../assets/Flag.png'
import Man from '../assets/man.png'
import { useLocation,useNavigate } from 'react-router-dom'

function IndiOpt(params){
    const {ind,v1,id,check,setCheck,submit}=params
    
    return (
        <>
        
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
        <input type="checkbox" value={`${ind}`} checked={submit?val[ind]:checked} disabled={submit}  className='mr-2'/>
        <label htmlFor="option">{v1}</label>
        <br />
        </>
    )
}

function IndiQues(params){
    const {sz,q1,ind1,eventId,val2,setVal2}=params
    const [check1,setCheck1]=useState(-1);
    const [val,setVal]=useState([]);
    const [val1,setVal1]=useState('')
    const [submit,setSubmit]=useState(false)
    const [check,setCheck]=useState(false)
    const [big,setBig]=useState(0);

    const handle=()=>{
      if(ind1==3 || ind1==5 || ind1==11 || ind1==13){
        val2[0]+=(3-check1);
      }else if(ind1==0 || ind1==7 || ind1==10 || ind1==12){
        val2[1]+=(3-check1);
      }
      else if(ind1==1 || ind1==6 || ind1==8 || ind1==15){
        val2[2]+=(3-check1);
      }
      else {
        val2[3]+=(3-check1);
      }
      setVal2(val2);
      console.log(val2)
    }
    useEffect(()=>{
      if(sz==(ind1+1)){let v1=val2;
      v1.sort();
      v1.reverse();
      setBig(v1[0]);}
    },[val2])
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
        handle();
    },[])
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
          <>
             <input type="radio" name={q1._id} checked={ind==check1} disabled={submit}  className='mr-2'/>
        <label htmlFor="option">{v1}</label>
        <br /></>
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
    {eventId=='660e9851132c16d83a65f910' && (sz==(ind1+1)) && <div className='flex flex-wrap gap-2'>
       {big==val2[0] && <div>
          <div className='text-3xl font-semibold mx-2'>Authoritative</div>
          <table className='mx-2 w-full sm:w-3/4 md:w-1/2'>
            <tr>
              <th className='border-2 border-black'>Strengths</th>
              <th className='border-2 border-black'>Weaknesses</th>
            </tr>
            <tr>
              <td className='border-2 border-black'>Group members know
exactly where they stand.</td>
<td className='border-2 border-black'>Unlikely to win full
commitment from all group
members.</td>
            </tr>
            <tr>
              <td className='border-2 border-black'>Decisions can be taken
rapidly, which is great in a
crisis.</td>
<td className='border-2 border-black'>Can lead to un-informed
and shallow decisions.</td>
            </tr>
            <tr>
              <td className='border-2 border-black'>Members can concentrate
on 'operational' tasks,
without having to worry
about 'strategic' issues.</td>
<td className='border-2 border-black'>Does not allow members
any space to develop.</td>
            </tr>
          </table>
        </div>}
        {big==val2[1] && <div>
          <div className='text-3xl font-semibold mx-2'>Democratic</div>
          <table className='mx-2  w-full sm:w-3/4 md:w-1/2'>
            <tr>
              <th className='border-2 border-black'>Strengths</th>
              <th className='border-2 border-black'>Weaknesses</th>
            </tr>
            <tr>
              <td className='border-2 border-black'>Gives power to group
members</td>
<td className='border-2 border-black'>May slow down tasks,
encouraging talk not action</td>
            </tr>
            <tr>
              <td className='border-2 border-black'>Energises and motivates
group members to achieve
their tasks</td>
<td className='border-2 border-black'>Can frustrate members
who like clear direction</td>
            </tr>
            <tr>
              <td className='border-2 border-black'>Builds individual
responsibility amongst
members.</td>
<td className='border-2 border-black'>The most popular decisions
are not always the best</td>
            </tr>
          </table>
          </div>}
          {big==val2[2] && <div>
            <div className='text-3xl font-semibold mx-2'>Facilitative</div>
          <table className='mx-2 sm:mx-2 w-full sm:w-3/4 md:w-1/2'>
            <tr>
              <th className='border-2 border-black'>Strengths</th>
              <th className='border-2 border-black'>Weaknesses</th>
            </tr>
            <tr>
              <td className='border-2 border-black'>Gives plenty of space for
creative ideas to emerge
and be explored</td>
<td className='border-2 border-black'>Can allow the group to
become aimless and chaotic</td>
            </tr>
            <tr>
              <td className='border-2 border-black'>Enables individual learning</td>
<td className='border-2 border-black'>The leadership 'gap' can
get filled by other people,
who have to operate as
'informal' leaders</td>
            </tr>
            <tr>
              <td className='border-2 border-black'>Can be empowering in the
right circumstances</td>
<td className='border-2 border-black'></td>
            </tr>
          </table>
          </div>}
          {big==val2[3] && <div>
            <div className='text-3xl font-semibold mx-2'>Situational</div>
          <table className='mx-2  w-full sm:w-3/4 md:w-1/2'>
            <tr>
              <th className='border-2 border-black'>Strengths</th>
              <th className='border-2 border-black'>Weaknesses</th>
            </tr>
            <tr>
              <td className='border-2 border-black'>Allows groups to change
over the time.</td>
<td className='border-2 border-black'>Difficult to carry off
effectively - group
members never know what
to expect, and may resist
changes in style.</td>
            </tr>
            <tr>
              <td className='border-2 border-black'>Adapts to urgent and non-
urgent situations.</td>
<td className='border-2 border-black'></td>
            </tr>
          </table>
          </div>}
      </div>}
    </div>
    )
}

function Result() {
    const [ques,setQues]=useState([])
    const [resp,setResp]=useState([])
    const [check,setCheck]=useState([])
    const [submit,setSubmit]=useState(false)
    const [visible,setVisible]=useState(true);
    const [visible1,setVisible1]=useState(false)
    const [val2,setVal2]=useState([0,0,0,0])
    const [id,setId]=useState('')
    const [sz,setSz]=useState(0)
    const locate=useLocation();
    const navigate=useNavigate()
    const postQues=async (id)=>{const resp1=await fetch('http://3.110.223.82:8000/postQues',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token1')
        },
        body:JSON.stringify({eventId:locate.state.eventId,id:id})
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
    const getAllQues=async()=>{const res=await fetch('http://3.110.223.82:8000/getAllQues',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token1')
      },
      body:JSON.stringify({id:locate.state.eventId})
     })
    const res1=await res.json();
    if(res1.success){
      setSz(res1.ques.length)
      for(let i=0;i<res1.ques.length;++i){
        postQues(res1.ques[i]._id);
        
      }
    }
    }
    const getDate = async()=>{
      const resp=await fetch('http://3.110.223.82:8000/getDate',{
        method:'POST',
        headers:{
          'auth-token':localStorage.getItem('token1'),
          'Content-Type':'application/json'
        },
        body:JSON.stringify({eventId:locate.state.eventId})
      })
      const resp1=await resp.json();
      if(resp1.success){
        let k1=new Date(resp1.date).valueOf();
        let k2=new Date().valueOf();
        if(k2>=k1){
          setVisible(false);
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
      getDate();
      getAllQues();
      handle();
    },[])
   const handleNavigate=()=>{
    navigate('/enroll',{state:{value:'enroll'}})
   }
  return (
    <div>
    <Navbar1 visible={visible1} setVisible={setVisible1}/>
    <div className='flex gap-2 mt-5'>
    <div className='m-0 p-0 hidden lg:block'>
      <Sidebar1/>
      </div>
      <div className='w-full rounded-md bg-[#CCEFFF]'>
      {ques.map((q1,ind1)=>{
        
        return (  <IndiQues q1={q1} sz={sz} ind1={ind1} eventId={locate.state.eventId} val2={val2} setVal2={setVal2}/> )
        })}
        {visible && <button onClick={()=>{handleNavigate()}}  className='px-6 py-2 mx-10 my-5 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Enroll</button>}
      </div>
      <div className={`mx-auto text-center  p-0 ${visible1?'hidden':'block'} absolute px-5 rounded-lg bg-white right-0 lg:hidden`}>
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

export default Result
