import { useState } from 'react'
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import {useSelector} from'react-redux'
import {useNavigate } from 'react-router'
const CreateCampain = () => {
    const [kindOfCampain,setKindOfCampain] =  useState('')
	const [name,setName] = useState('')
	const [description,setDescription] = useState('')
    const [image, setImage] = useState() 
    const [amount, setAmount] = useState(500);
    const navigate = useNavigate()
    const [viewImage,setViewImage] = useState()
    const email = useSelector((state)=> state.user.email)
    const token = useSelector((state)=> state.user.token)

   const sendCampain = async () => {
    if (!kindOfCampain || !name || !description || !amount || !image) {
        toast('Please make sure all data fields are set');
        return;
    }
    try {
        const formData = new FormData();
        formData.append('image', image); // Attach the image file
        formData.append('name', name);
        formData.append('email', email);

        formData.append('description', description);
        formData.append('target',amount);
        formData.append('kindOfCampain', kindOfCampain);

        const res = await axios.post('http://localhost:8080/charity/createCampain', formData, {
            headers: {
                Authorization: `Bearer ${token}`, // Send the token in the Authorization header
                'Content-Type': 'multipart/form-data', // Set content type
            },
        });

        navigate('/Home');
    } catch (error) {
        console.error(error);
        toast.error('Failed to create campaign');
    }
};

    const handleSliderChange = (event, newValue) => {
        setAmount(newValue);
    }
	function handleChange(e) {
        setImage(e.target.files[0]);
        setViewImage(URL.createObjectURL(e.target.files[0]))
    }
    const [accordionOpen, setAccordionOpen] = useState(true)
    const causes =  ['No Poverty', 'Gender Equality', 'Help Elders', 'Zero Hunger', 'Good Heath And Well Being', 'Clean Water', 'Reduced Trash']
   
    return (
        <div className="bg-red-50">
            
            <p>What kind of campain ? Choose one </p>
            <div className="py-2">
                <span>Charity Category</span>
                <button
                    onClick={() => setAccordionOpen(!accordionOpen)}
                    className="flex justify-between w-full "
                >
                
                    <svg
                        className="fill-indigo-500 shrink-0 ml-8"
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            y="7"
                            width="16"
                            height="2"
                            rx="1"
                            className={`transform origin-center transition duration-200 ease-out ${accordionOpen && "!rotate-180"
                                }`}
                        />
                        <rect
                            y="7"
                            width="16"
                            height="2"
                            rx="1"
                            className={`transform origin-center rotate-90 transition duration-200 ease-out ${accordionOpen && "!rotate-180"
                                }`}
                        />
                    </svg>
                    {kindOfCampain && !accordionOpen  && <h1 className='absolute p-16 pt-32'>You are Looking for donors for {kindOfCampain}</h1>}
                </button>
                <div
                    className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${accordionOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                >
                    {
                        causes.map((cause, index) => (
                            <div onClick={() => {
                                setKindOfCampain(cause)
                                setAccordionOpen(false)
                            }} className="overflow-hidden p-3 cursor-pointer" key={index}>
                                {cause}
                            </div>
                        ))
                    }
                   
               
                   
                </div>
            </div>
            <div className='items-center justify-center flex flex-col'>
                <h2>Add Image to your campain:</h2>
                <input type="file" onChange={handleChange} />
                <img className='z-10 m-8' src={viewImage} width={200} height={200} />
            </div>
            <div>
                 <p>how is named your charity project?</p>
                <input value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className='pt-16'>
                <p>Describe in a few words what your project is about </p>
                <div>
                    <textarea className='' value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
            </div>
         
            <p>How much do you need for your charity project</p>
            <div style={{ width: "300px", margin: "20px auto", textAlign: "center" }}>
                <Typography variant="h6">Select an Amount</Typography>
                <Slider
                    value={amount}
                    min={0}
                    max={100000}
                    step={10}
                    onChange={handleSliderChange}
                    valueLabelDisplay="on"
                />
                <Typography variant="body1">
                    Selected Amount: <strong>${amount}</strong>
                </Typography>
            </div>
            <div>
                <button onClick={sendCampain}>Lauch campain</button>
            </div>
        </div>
    );
}

export default CreateCampain 