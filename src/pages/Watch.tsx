import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { getAllVideoData } from '../utils/getAllVideoData';
import { getAllRecommendedVideosdata } from '../utils/getAllRecommendedVideosdata';
import { HomeVideoType, RecommendedVideoType } from '../utils/Types';
import MiniCardComponent from '../components/MiniCardComponent';
import WatchDetails from '../components/WatchDetails';
import { fetchActivities } from '../utils/api';

const API_KEY = import.meta.env.VITE_API_KEY;


function Watch() {
    const { videoId, channelId } = useParams()
    const [videoDetails, setVideoDetails] = useState<HomeVideoType>()

    const [recommendedVideos, setRecommendedVideos] = useState<RecommendedVideoType[]>([])

    const getVideoDetails = async () => {
        try {
            const url = `${BASE_URL}/videos?part=snippet&id=${videoId}&maxResults=20&key=${API_KEY}`
            const response = await axios.get(url);
            const mappedVideos = await getAllVideoData(response.data.items);
            setVideoDetails(mappedVideos[0])
        } catch (error) {
            console.error(`Error fetching videos:`, error);
        }
    }

    const getRecommendedVideos = async () => {
        try {
            const fetchRecommendedData = await fetchActivities(channelId)

            const mappedVideos = await getAllRecommendedVideosdata(fetchRecommendedData, videoId);
            setRecommendedVideos(mappedVideos)
        } catch (error) {
            console.error(`Error fetching videos:`, error);
        }
    }

    useEffect(() => {
        getVideoDetails()
        getRecommendedVideos()
    }, [videoId, channelId])


    return (
        <div className=' w-[95%] mx-auto mt-6 mb-12'>
            <div className="row">
                <div className="col-8">
                    <iframe
                        className='w-full aspect-[16/9] rounded'
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    <WatchDetails videoDetails={videoDetails} />
                </div>
                <div className="col-4 h-fit flex flex-col gap-3">
                    {recommendedVideos.length > 0 &&
                        recommendedVideos.map((item: RecommendedVideoType) => (
                            <MiniCardComponent data={item} key={item.videoId} />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Watch