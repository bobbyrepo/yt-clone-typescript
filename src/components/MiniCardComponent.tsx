import React from 'react'
import { RecommendedVideoType } from '../utils/Types'
import { Link } from 'react-router-dom'

function MiniCardComponent({ data }: { data: RecommendedVideoType }) {
    return (
        <Link
            to={`/watch/${data.channelInfo.id}/${data.videoId}`}
            className="col cursor-pointer hover:scale-[101%] duration-200 ease-in-out"
        >
            <div className="flex gap-3">
                <div className="relative min-w-fit">
                    <span className="absolute bottom-1 right-1 text-sm bg-[#0c0c0cd0] px-2 py-0.5 z-10 rounded">
                        {data.videoDuration}
                    </span>
                    <img
                        src={data.videoThumbnail}
                        className="w-40 aspect-[16/9]  object-cover rounded"
                        alt="thumbnail"
                    />
                </div>
                <div className="flex gap-1 flex-col">
                    <h4 className="text-md">{data.videoTitle}</h4>
                    <div className="text-sm text-gray-400">
                        <div>{data.channelInfo.name} </div>
                        <div className="flex gap-1">
                            <span>{data.videoViews} views</span>
                            <span>•</span>
                            <span>{data.videoAge}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MiniCardComponent