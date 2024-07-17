import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getAllVideoData } from '../utils/getAllVideoData';
import { getAllRecommendedVideosdata } from '../utils/getAllRecommendedVideosdata';
import { HomeVideoType, RecommendedVideoType } from '../utils/Types';
import MiniCardComponent from '../components/MiniCardComponent';
import Spinner from '../components/Spinner';
import WatchDetails from '../components/WatchDetails';
import { fetchChannelVideos, fetchVideosData } from '../utils/api';
import CommentList from '../components/Watch/CommentList';

const API_KEY = import.meta.env.VITE_API_KEY;

interface VideoListState {
    videos: RecommendedVideoType[],
    nextPageToken: null | string
};

function Watch() {
    const { videoId, channelId } = useParams()
    const [videoDetails, setVideoDetails] = useState<HomeVideoType>()
    const [recommendedVideos, setRecommendedVideos] = useState<VideoListState>({ videos: [], nextPageToken: null })

    const getVideoDetails = async () => {
        try {
            const Videodata = videoId && await fetchVideosData(videoId)
            const mappedVideos = await getAllVideoData(Videodata);
            setVideoDetails(mappedVideos[0])
        } catch (error) {
            console.error(`Error fetching videos:`, error);
        }
    }

    const getRecommendedVideos = async () => {
        try {
            const RecommendedData = await fetchChannelVideos(channelId)

            const mappedVideos = await getAllRecommendedVideosdata(RecommendedData.items, videoId);
            setRecommendedVideos((prevData) => ({
                videos: [...prevData.videos, ...mappedVideos],
                nextPageToken: null,
                // nextPageToken: RecommendedData.nextPageToken,
            }));
        } catch (error) {
            console.error(`Error fetching videos:`, error);
        }
    }

    useEffect(() => {
        getVideoDetails()
        getRecommendedVideos()
    }, [videoId, channelId])


    return (
        <div>
            {/* <InfiniteScroll
                dataLength={recommendedVideos.videos.length}
                next={getRecommendedVideos}
                hasMore={true}
                loader={<Spinner />}
                height={740}
                endMessage={<p>No more playlists found</p>}
            > */}
            <div className=' sm:w-[95%] w-[98%] mx-auto md:mt-6 mt-2 mb-12'>
                <div className="row">
                    <div className="col-xl-8 col-lg-7">
                        <iframe
                            className='w-full aspect-[16/9] rounded'
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <WatchDetails videoDetails={videoDetails} />
                        <div className="lg:block hidden">
                            <CommentList videoId={videoId} />
                        </div>                        </div>
                    <div className="col-xl-4 col-lg-5 h-fit flex flex-col gap-3 lg:mt-0 mt-3">
                        {recommendedVideos.videos.length > 0 &&
                            recommendedVideos.videos.map((item: RecommendedVideoType) => (
                                <MiniCardComponent data={item} key={item.videoId} />
                            ))}
                    </div>
                    <div className="lg:hidden block">
                        <CommentList videoId={videoId} />
                    </div>
                </div>
            </div>
            {/* </InfiniteScroll> */}
        </div>
    )
}

export default Watch