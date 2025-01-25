import givinghands from '../assets/giving_hands.jpg'
import { useState } from 'react'
import { Link ,useNavigate} from 'react-router'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { login } from "../redux/slices/userSlice";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const doSignIn = async () => {
        const res = await axios.post("http://localhost:8080/auth/login",{email,password})
        const token = res.data.token;
        const name = res.data.name
        dispatch(login({ name, email,token }));
        navigate("/Home");
    } 
    return (
        <div className='bg-red-50'>
            <div className='p-8'>
                <h1>Sign In</h1>
            </div>
            <div className='items-centere  justify-items-center m-10'>
                <div className='w-32 h-32 overflow-hidden rounded-full' >
                    <img className='w-full h-full object-cover' src={givinghands} width={100} height={200} />
                </div>

            </div>
            <div className='flex flex-col items-center'>
                <input className='p-4 m-2' placeholder='email' onChange={(e) => setEmail(e.target.value)}></input>
                <input className='p-4 m-2' placeholder='password' type='password' onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <button className='py-2 px-16 m-8 bg-red-600 text-white' onClick={doSignIn}>Sign IN </button>
            <Link className='m-4' to="/register" ><p className='m-4'>You don't have an account?</p></Link>
        </div>
    )
}

export default Login