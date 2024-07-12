import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { getAllRecommendedVideosdata } from '../utils/getAllRecommendedVideosdata';
import { RecommendedVideoType } from '../utils/Types';
import MiniCardComponent from '../components/MiniCardComponent';

const API_KEY = import.meta.env.VITE_API_KEY;


function Watch() {
    const { videoId, channelId } = useParams()

    const [recommendedVideos, setRecommendedVideos] = useState<RecommendedVideoType[]>([])

    const getRecommendedVideos = async () => {
        try {
            const {
                data: { items },
            } = await axios.get(
                `${BASE_URL}/activities?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20`
            );
            const mappedVideos = await getAllRecommendedVideosdata(items, videoId);
            setRecommendedVideos(mappedVideos)
        } catch (error) {
            console.error(`Error fetching videos:`, error);
        }
    }

    useEffect(() => {
        getRecommendedVideos()
    }, [videoId, channelId])


    return (
        <div className=' w-[95%] mx-auto mt-6'>
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
                </div>
                <div className="col-4 flex flex-col gap-3">
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