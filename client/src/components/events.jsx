import React,{useState,useRef} from 'react'
import Navbar from './navbar'
import Sidebar from './sidebar'
import Mask from '../assets/Mask.png'

function events() {
    const [createEvent,setCreateEvent]=useState(false)
    const [event,setEvent]=useState('')
    const [college,setCollege]=useState('')
    const [date,setDate]=useState('')
    const [time,setTime]=useState('')
    const [place,setPlace]=useState('')
    const [desc,setDesc]=useState('')
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
      const url = URL.createObjectURL(event.target.files[0]);
    setImageUrl(url);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      if (selectedFile) {
        // Here you can perform the file upload logic
        console.log('Selected file:', selectedFile);
        // You can use fetch or a library like Axios to send the file to a server-side endpoint
      } else {
        console.log('No file selected');
      }
    };
    const handleButtonClick = () => {
        // Programmatically trigger click event on the file input
        fileInputRef.current.click();
      };
  return (
    <div>
      <Navbar/>
      <div className='flex gap-2 mt-5'>
        <Sidebar/>
        <div className='w-full rounded-md bg-[#CCEFFF] p-5'>
        {createEvent?(
            <div>
                <div className='text-3xl font-semibold'>Add New Event</div>
                <div className='mt-5 bg-white rounded-xl flex flex-col items-center justify-center py-20'>
                    <div className='w-24 h-24 rounded-full bg-[#ECECEE] cursor-pointer' onClick={handleButtonClick}>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className='hidden'/>
                        <img src={imageUrl?imageUrl:Mask} className='w-24 h-24 rounded-full' alt="" />
                    </div>
                <div className='text-center text-[#4379EE] text-sm mt-4 cursor-pointer'>Upload Cover Photo</div>
                    <div className='flex gap-10 w-full justify-center mt-10'>
                        <div className='flex flex-col w-1/4'>
                            <div>Event Name</div>
                            <input type="text" value={event} onChange={(e)=>{setEvent(e.target.value)}} className='w-full p-2 rounded-lg outline-none  bg-[#EEF2FF] border border-[#315EFF] '
                            placeholder='Enter Event Name'/>
                        </div>
                        <div className='flex flex-col w-1/4'>
                            <div>College Name</div>
                            <input value={college} onChange={(e)=>{setCollege(e.target.value)}} type="text" className='w-full p-2 rounded-lg outline-none bg-[#EEF2FF] border border-[#315EFF]'
                            placeholder='Enter College Name'/>
                        </div>
                    </div>
                    <div className='flex gap-10 w-full justify-center mt-5'>
                        <div className='flex flex-col w-1/4'>
                            <div>Date</div>
                            <input type="date" value={date} onChange={(e)=>{setDate(e.target.value)}} className='w-full p-2 rounded-lg outline-none bg-[#EEF2FF] border border-[#315EFF] '/>
                        </div>
                        <div className='flex flex-col w-1/4'>
                            <div>Time</div>
                            <input type="time" value={time} onChange={(e)=>{setTime(e.target.value)}} className='w-full p-2 rounded-lg outline-none bg-[#EEF2FF] border border-[#315EFF]'/>
                        </div>
                    </div>
                    <div className='flex gap-10 w-full justify-center mt-5'>
                        <div className='flex flex-col w-1/4'>
                            <div>Place</div>
                            <input type="text" value={place} onChange={(e)=>{setPlace(e.target.value)}} className='w-full p-2 rounded-lg outline-none bg-[#EEF2FF] border border-[#315EFF] '
                            placeholder='Mumbai'/>
                        </div>
                        <div className='flex flex-col w-1/4'>
                            <div>Enter Input Field Name</div>
                            <input type="text" value={desc} onChange={(e)=>{setDesc(e.target.value)}} className='w-full p-2 rounded-lg outline-none bg-[#EEF2FF] border border-[#315EFF]'
                            placeholder='Enter input field description here'/>
                        </div>
                    </div>
                    <button className=' mt-10 px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Add Event Now</button>
                </div>
            </div>
        ):(
            <button onClick={()=>{setCreateEvent(true)}} className='px-6 py-2 text-white text-lg font-semibold bg-[#315EFF] rounded-lg'>Create Event</button>)
        }
        </div>
      </div>
    </div>
  )
}

export default events
