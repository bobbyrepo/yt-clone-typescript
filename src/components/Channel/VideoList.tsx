import React from 'react'
import { RecommendedVideoType } from '../../utils/Types'
import VideoListCard from './VideoListCard'

function VideoList({ videoList }: { videoList: RecommendedVideoType[] }) {
    return (
        <div className="row row-cols-lg-4 row-cols-sm-3 row-cols-2 gap-y-4  cursor-pointer">
            {videoList.length > 0 &&
                videoList.map((videoData) => (
                    <VideoListCard key={videoData.videoId} data={videoData} />
                ))
            }
        </div>)
}

export default VideoList