import './App.css'
import { BrowserRouter, Routes, Route,Navigate } from "react-router";
import  VerifyEmail from './Routes/VerifyEmail.jsx'
import Register from './Routes/Register.jsx'
import Login from './Routes/Login.jsx'
import { ToastContainer } from 'react-toastify';
import Choices from './Routes/Choices.jsx'
import Home from './Routes/Home.jsx'
import CreateCampain from './Routes/CreateCampain.jsx';
import Real from './Routes/Real.jsx'
import CampaignDetails from './Routes/CampaignDetails'
import PaymentRoute from './Routes/PaymentRoute.jsx'
function App() {
  return (
      <>    
        
          <BrowserRouter>
              
              <Routes>
                  <Route path='/login' element={<Login />}/>
                  <Route path='/register' element={<Register />} />
                  <Route path='/VerifyEmail' element={<VerifyEmail />} />
                  <Route path='/Choices' element={<Choices />} />
                  <Route path='/Home' element={<Home />} />
                  <Route path='/CreateCampain' element={<CreateCampain />} />
                  <Route path="/campaign/:the_name" element={<CampaignDetails />} />
                  <Route path='/Real' element={<Real/>} />
                  <Route path='/payment' element={<PaymentRoute/>}/>
                  <Route path='*' element={<Navigate to='login'/>}/>
             
              </Routes>

        
          </BrowserRouter>
          <ToastContainer position="top-center"autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
          
      </>
  )
}

export default App
