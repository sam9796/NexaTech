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
        <input type="checkbox" value={`${ind}`} checked={submit?val[ind]:checked} disabled={true}  className='mr-2'/>
        <label htmlFor="option">{v1}</label>
        <br />
        </>
    )
}
function IndiOpt22(params){
  const {ind,ind1,submit,val,setVal}=params
  useEffect(()=>{
  })
  return (
                              <th className='px-1'>
                                  <input type="radio" name={ind}  disabled={true} checked={val[ind]==ind1} onChange={(e)=>{
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
                                  <input type="checkbox" checked={submit?val[ind][ind1]:check} name={ind} disabled={true}
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
  const [check,setCheck]=useState(false);

  const getQues=async (p7)=>{
      const resp1=await fetch('http://3.110.223.82:8000/getPart',{
          method:'POST',   
          headers:{
              'Content-Type':'application/json',
              'auth-token':localStorage.getItem('token1')
          },
          body:JSON.stringify({eventId:eventId,id:id})        
       })
      const resp2=await resp1.json();
      if(resp2.success){
          if(resp2.k2){
              setSubmit(resp2.k2);
              setCheck(resp2.k3==q1.resp)
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
              {q1.resp.trim()!='' && 
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
      </table>
      </>
  )
}
function IndiOpt3(params){
  const {q1,submit,id,val,setVal,setSubmit,eventId}=params;
  const [horz,setHorz]=useState([]);
  const [vert,setVert]=useState([]);
  const [check,setCheck]=useState(false);
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
              setCheck(resp2.k3==q1.resp)
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
              {q1.resp!=' ' && 
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
      </table>
      </>
  )
}

function IndiOpt4(params){
  const {id,val,submit,check,setCheck,ind}=params
  return (
      <div>
      <input type="radio" name={id} checked={ind==check}   disabled={true} onChange={(e)=>{
          setCheck(ind) }}  className='mr-2'/>
      <br/>
      <label htmlFor="option">{val}</label>
      </div>
  )
}
function IndiQues(params){
    let {sz,q1,ind1,eventId,val2,setVal2,sz1,setSz1}=params
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
      ++sz1;
      setSz1(sz1);
      setVal2(val2);
    }
    useEffect(()=>{
      if(sz==sz1){let v1=val2;
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
                    setCheck(q1.resp==resp2.k3);
                    console.log(q1.resp,resp2.k3)
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
        if(q1.type!='grid' && q1.type!='multigrid') getQues();
        if(q1.quizId=='661abc1d6b6e63f6537e6eb2')handle();
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
             <input type="radio" name={q1._id} checked={ind==check1} disabled={true}  className='mr-2'/>
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
        <select name="dropdown" value={val1} disabled={true} onChange={(e)=>{setVal1(e.target.value)}} className='outline-none border-none px-4 py-2 rounded-md'>
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
    {q1.type=='descriptive'  && (<input value={val1} disabled={true} onChange={(e)=>{setVal1(e.target.value)}} className='p-2 mx-1 rounded-md bg-white'/>)}

        {q1.type=='grid' && <IndiOpt2 id={q1._id} q1={q1} submit={submit} val={val} setVal={setVal} setSubmit={setSubmit} eventId={eventId}/>}
    {q1.type=='multigrid' && <IndiOpt3 id={q1._id} q1={q1} eventId={eventId} submit={submit} setSubmit={setSubmit} val={val} setVal={setVal}/>}
    <div className='flex flex-wrap gap-2'>
    {q1.type=='linear' && q1.options.map((i1,ind)=>{
        return <IndiOpt4 val={i1} id={q1._id} check={check1} eventId={eventId} setCheck={setCheck1} setSubmit={setSubmit} submit={submit} ind={ind}/>
    })}</div>
    {q1.resp!=' ' &&  (q1.type!='grid' && q1.type!='multigrid')&&
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
    {q1.quizId=='661abc1d6b6e63f6537e6eb2' && (sz==sz1) && <div className='flex flex-wrap gap-2'>
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
    const [visible,setVisible]=useState(true);
    const [visible1,setVisible1]=useState(false)
    const [val2,setVal2]=useState([0,0,0,0])
    const [id,setId]=useState('')
    const [sz,setSz]=useState(0)
    const [sz1,setSz1]=useState(0);
    const locate=useLocation();
    const navigate=useNavigate()
   
    const getAllQues=async()=>{const res=await fetch('http://3.110.223.82:8000/getAllQues2',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token1')
      },
      body:JSON.stringify({id:locate.state.eventId})
     })
    const res1=await res.json();
    if(res1.success){
        let l1=0;
        for(let i=0;i<res1.ques.length;++i){
            if(res1.ques.quizId=='661abc1d6b6e63f6537e6eb2')++l1;
        }
      setSz(l1);
        setQues(res1.ques);
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
        
        return (  <IndiQues q1={q1} sz={sz} sz1={sz1} setSz1={setSz1} ind1={ind1} eventId={locate.state.eventId} val2={val2} setVal2={setVal2}/> )
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
