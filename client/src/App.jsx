import { useState } from 'react'
import Login from './components/login'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './components/register'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Dashboard from './components/dashboard';
import Events from './components/events';
import IndiEvent from './components/indiEvent';
import Login1 from './components/login1';
import Dashboard1 from './components/dashboard1';
import Quiz from './components/quiz';
import Result from './components/result';
import Enroll from './components/enroll';
import Events1 from './components/events1';
import EventMain from './components/eventMain';

function App() {

  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/dashboard' element={<Dashboard/>}/>
      <Route exact path='/event' element={<Events/>}/>
      <Route exact path='/indiEvent' element={<IndiEvent/>}/>
      <Route exact path='/login1' element={<Login1/>}/>
      <Route exact path='/dashboard1' element={<Dashboard1/>}/>
      <Route exact path='/quiz' element={<Quiz/>}/>
      <Route exact path='/result' element={<Result/>}/>
      <Route exact path='/enroll' element={<Enroll/>}/>
      <Route exact path='/event1' element={<Events1/>}/>
      <Route exact path='/eventmain' element={<EventMain/>}/>
     </Routes>
     </BrowserRouter>
      <ToastContainer/>
    </div>
  )
}

export default App
