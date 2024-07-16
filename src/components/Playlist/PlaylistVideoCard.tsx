import React from 'react'
import { Link } from 'react-router-dom'
import { PlaylistItemType } from '../../utils/Types'

function PlaylistVideoCard({ item, ind }: { item: PlaylistItemType, ind: number }) {
    return (
        <Link
            to={`/watch/${item.channelId}/${item.id}`}
            className="col cursor-pointer hover:scale-[101%] duration-200 ease-in-out"
        >
            <div className="flex flex-col gap-2">
                <div className="relative">
                    <span className="absolute bottom-1 right-1 text-sm bg-[#0c0c0cd0] px-2 py-0.5 z-10 rounded">
                        {/* {data.videoDuration} */}
                    </span>
                    <div className="absolute flex items-center h-full w-[20%] left-0 text-sm bg-[#0c0c0ce0] z-10">
                        <p className='w-fit  mx-auto text-xl text-neutral-400'>{ind + 1}</p>
                    </div>
                    <img
                        src={item.thumbnails.high.url}
                        className="aspect-[16/9]  object-cover rounded"
                        alt="thumbnail"
                    />
                </div>
                <div className="">
                    <h4 className="text-md line-clamp-2">{item.title}</h4>
                </div>
            </div>
        </Link >)
}

export default PlaylistVideoCard