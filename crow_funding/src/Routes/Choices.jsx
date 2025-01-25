import { useState } from 'react'
import axios from 'axios'
import { useSelector,useDispatch} from 'react-redux';
import {useNavigate }  from 'react-router'
import {setInterests} from '../redux/slices/userSlice.js'
const Choices = () => {
    const email  =  useSelector((state)=> state.user.email)
    const [selectedInterests, setSelectedInterests] = useState([]);
    const interests = ['No Poverty', 'Gender Equality', 'Help Elders', 'Zero Hunger', 'Good Heath And Well Being', 'Clean Water', 'Reduced Trash']
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toggleInterest = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter((item) => item !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };
    const setInteretsInServer = async () => {
        const res = await axios.post('http://localhost:8080/charity/interests', { interests: selectedInterests, email })
        dispatch(setInterests(selectedInterests))
        navigate('/Home')
    }
    
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Select Your  Charity Interests</h1>
            <div className="flex flex-wrap gap-4 pt-32">
                {interests.map((interest) => (
                    <div
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-4 py-2 cursor-pointer rounded-full border-2 transition-all
              ${selectedInterests.includes(interest)
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-gray-200 text-gray-800 border-transparent"
                            }
            `}
                    >
                        {interest}
                    </div>
                ))}
            </div>
            <button type='button' onClick={setInteretsInServer}>Finish</button>
        </div>
    );
}


export default Choices 


