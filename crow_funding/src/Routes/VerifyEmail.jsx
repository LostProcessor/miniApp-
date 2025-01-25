import   {useEffect,useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router'

const VerifyEmail = () => {
     const navigate = useNavigate()
     const  email =  useSelector((state)=>state.user.email)
     const do_the_work  = async()=>{
         const res  = await axios.post("http://localhost:8080/auth/sendVerification",{email})
         navigate('/real')

    }
    
    const DoIt = async () => {
        await do_the_work()
        
    }
  
    return  (
       <div className='flex flex-col'>
            <div className='fixed'>
                <h2>Receive now your verification code through your email</h2> 
                <button onClick={DoIt}>Send code</button>
            </div>
        </div>
    )

}


export default VerifyEmail