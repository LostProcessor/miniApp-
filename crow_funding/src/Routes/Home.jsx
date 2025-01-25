import { useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { CiSearch } from "react-icons/ci";
import axios from 'axios'
import Slider from '../components/Slider.jsx'
import {useNavigate } from 'react-router'

const Home = () => {
    const navigate = useNavigate()
    const [searchForCampain, setSearchForCampain] = useState('')
    const [featuredCampains, setFeaturedCampains] = useState([])
    const [campains, setCampains] = useState([])
    const [displayCampain,setDisplayCampain] = useState([])
    const [loading,setLoading] = useState(true)
    const interests = useSelector((state)=>state.user.interests)
    const getCampains = async () => {

        let campains = await axios.get('http://localhost:8080/charity/campains')
    
        let data = campains.data

        campains=data.filter((c)=> interests.includes(c.kindOfCampain))
        setCampains(campains)
        setDisplayCampain(campains)
    }
    const getFeaturedCampaings = async () => {
        const featured = await axios.get('http://localhost:8080/charity/featured')
  
        setFeaturedCampains(featured.data)
        setLoading(false)
    
    }
    const goToTheCampainPage = (the_name) => {
        navigate(`/campaign/${the_name}`);
    }
    useEffect(() => {
        getCampains()
        getFeaturedCampaings()

    }, []);
    const updateCampainsOnSerach = () => {
        const filtered = campains.filter((campain) =>
            campain.name.toLowerCase().includes(searchForCampain.toLowerCase())
        );

        setDisplayCampain(filtered);
    };
    useEffect(()=>{
      updateCampainsOnSerach()
    },[searchForCampain])
  
    return (
        <div>
           <div className='absolute top-2 left-2'>
                <button onClick={()=>navigate('/Choices')}>reset Preferenceses</button>
            </div>
        <div className='justify-center items-center '>
         
            <p>Giving makes a difference</p>
            <div className='flex wrap align-center items-center flex-col'>
                <div className='flex  p-16'>
                    <CiSearch className='m-2' />
                    <input onChange={(e) => setSearchForCampain(e.target.value)} value={searchForCampain} placeholder='look for a campain now !'></input>
                </div>
               
            </div>

            {featuredCampains.length && <Slider campains={featuredCampains} />}

            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col">
                    {displayCampain && displayCampain.map((camp, index) => (
                        <div

                            onClick={()=>goToTheCampainPage(camp.name)}
                            key={index}
                            className="m-32 relative w-80 origin-center"

                        >
                            <img src={camp.images[0]} alt={camp.name} />
                            <h2>{camp.name}</h2>
                            <p>{camp.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='bg-red-500'>
                <button className='text-white' onClick={()=>navigate('/Createcampain')}> Create a campain</button>
            </div>

          
        </div>
    </div>
    )
}


export default Home