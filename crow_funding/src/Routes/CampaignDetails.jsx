import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { chooseCampaign } from '../redux/slices/campaignSlice.js';
import axios from "axios";
import Skeleton from "../components/skeleton";
import PieChartComponent from '../components/PieChart.jsx';
import { useNavigate } from 'react-router';

const CampaignDetails = () => {
  const [loading, setLoading] = useState(true);
  const [charityName, setCharityName] = useState("");
  const [target, setTarget] = useState(0);
  const [raised, setRaised] = useState(0);
  const [donors, setDonors] = useState([]);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const { the_name } = useParams();

    const getCampaign = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8080/charity/getCampaignDetails",
                { name: the_name }
            );
            const { name, target, raised, donors, images, description } = res.data;
            setCharityName(name);
            setTarget(target);
            setRaised(raised / 100);
            setDonors(donors);
            setImages(images);
            setDescription(description);
            dispatch(chooseCampaign(name));
        } catch (error) {
            console.error("Error fetching campaign details:", error);
        } finally {
            setLoading(false);
        };
    };

        useEffect(() => {
            setLoading(true);
            getCampaign();
        }, []);

        const handleClick = () => {
            navigate('/payment');
        }

        return (
            <div>
                <button className='bg-blue-500 text-white ' onClick={() => navigate('/Home')} >bzck to home</button>
                {loading ? (
                    <Skeleton />
                ) : (
                    <>
                        <div className="w-full">
                            <div>
                                {images.length > 0 && (
                                    <img
                                        src={images[0]}
                                        alt="Campaign"
                                        className="w-full h-auto object-cover"
                                    />
                                )}
                            </div>
                            <div>
                                <h1>{charityName}</h1>
                                <p>{description}</p>
                                <PieChartComponent raised={raised} target={target} />
                                <p>{raised}</p>
                            </div>
                            {donors.length > 0 && (
                                <>
                                    <h2>People who gave money for this charity</h2>
                                    <div className="max-h-20 overflow-y-scroll">
                                        {donors.map((donor, index) => (
                                            <div key={index}>
                                                <p>{donor}</p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                        <div>
                            <button type="button" onClick={handleClick}>
                                Donate Now
                            </button>
                        </div>
                    </>
                )}
            </div>
  );
};

export default CampaignDetails