import React from 'react'
import { Link } from 'react-router-dom'
import { RecommendedVideoType } from '../../utils/Types'

function VideoListCard({ data }: { data: RecommendedVideoType }) {
    return (
        <Link
            to={`/watch/${data.channelInfo.id}/${data.videoId}`}
            className="col cursor-pointer"
        >
            <div className="flex flex-col sm:gap-3 gap-1">
                <div className="relative  hover:scale-[101%] duration-200 ease-in-out">
                    <span className="absolute bottom-1 right-1 text-sm bg-[#0c0c0cd0] px-2 py-0.5 z-10 rounded">
                        {data.videoDuration}
                    </span>
                    <img
                        src={data.videoThumbnail}
                        className="w-full aspect-[16/9] object-cover rounded"
                        alt="thumbnail"
                    />
                </div>
                <div className="flex gap-1 flex-col">
                    <h4 className="sm:text-md text-sm line-clamp-1">{data.videoTitle}</h4>
                    <div className="text-sm text-gray-400">
                        {/* <div>{data.channelInfo.name} </div> */}
                        <div className="md:flex gap-3">
                            <p>{data.videoViews} views</p>
                            <p>{data.videoAge}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default VideoListCard