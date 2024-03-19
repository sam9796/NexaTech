import React,{useState,useEffect} from 'react'
import Navbar from './navbar'
import Sidebar from './sidebar'

function Dashboard() {
    

  return (
    <div>
      <Navbar/>
      <div className='flex gap-2 mt-5'>
        <Sidebar/>
        <div className='w-full rounded-md bg-[#CCEFFF]'>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
