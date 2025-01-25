import { useState } from 'react'
import {ArrowBigLeft,ArrowBigRight } from 'lucide-react'
import {useNavigate} from 'react-router'
const Slider = ({ campains }) => {
    const navigate = useNavigate()
    const [index, setIndex] = useState(0)

    const showPrev = () => {
        setIndex(index => {
            if (index === 0) return campains.length - 1
            return index-1
        })
    }
    const showNext = () => {
        setIndex(index => {
            if (index === campains.length - 1) return 0
            return index+1
        })
    }

    return (
       <div className="max-w-[800px] h-[500px] mx-auto my-auto relative  flex-row">
        <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10"
            onClick={showPrev}
        >
            <ArrowBigLeft />
      </button>

        <div onClick={() => navigate(`/campaign/${campains[index].name}`)} className=''>
            <h1>{campains[index].name}</h1>
            <img
                className='mr-auto ml-auto'
                width={250} height={150}
                src={campains[index].images[0]}
                alt="Campaign"
            />
        </div>

       
        <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10"
            onClick={showNext}
        >
            <ArrowBigRight />
        </button>
    </div>


      
    )
}


export default Slider