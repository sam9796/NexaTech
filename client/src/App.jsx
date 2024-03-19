import { useState } from 'react'
import Login from './components/login'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './components/register'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Dashboard from './components/dashboard';
import Events from './components/events';


function App() {

  return (
    <div>
     <BrowserRouter>
     <Routes>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/dashboard' element={<Dashboard/>}/>
      <Route exact path='/event' element={<Events/>}/>
     </Routes>
     </BrowserRouter>
      <ToastContainer/>
    </div>
  )
}

export default App
