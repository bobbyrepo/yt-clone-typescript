import React from 'react'
import { RecommendedVideoType } from '../../utils/Types'
import MiniCardComponent from '../MiniCardComponent'
import VideoListCard from './VideoListCard'

function VideoList({ videoList }: { videoList: RecommendedVideoType[] }) {
    return (
        <div className="row row-cols-4 gap-y-8 cursor-pointer">
            {videoList.length > 0 &&
                videoList.map((videoData) => (
                    <VideoListCard key={videoData.videoId} data={videoData} />
                ))
            }
        </div>)
}

export default VideoList