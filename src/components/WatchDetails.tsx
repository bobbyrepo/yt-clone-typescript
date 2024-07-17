import { Link } from 'react-router-dom';
import { HomeVideoType } from '../utils/Types'
import { BiLike } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import { useState } from 'react';

function WatchDetails({ videoDetails }: { videoDetails?: HomeVideoType }) {
    const [showDescription, setShowDescription] = useState(false)

    return (
        <div className="flex flex-col sm:gap-3 gap-2 mt-2 mx-1">
            <h1 className="md:text-2xl sm:text-xl text-lg font-semibold">{videoDetails?.videoTitle}</h1>

            <div className="sm:flex items-center justify-between">
                <div className="flex sm:gap-3 gap-2 items-center">
                    <Link to={`/channel/${videoDetails?.channelInfo.id}`} >
                        <img src={videoDetails?.channelInfo?.image}
                            className='w-12 h-fit aspect-[1/1] rounded-full hover:scale-[108%] duration-100 ease-in-out'
                            alt="channelImage" />
                    </Link>
                    <div className="flex flex-col sm:text-lg text-md">
                        <Link to={`/channel/${videoDetails?.channelInfo.id}`} >
                            <h2 className=' font-semibold'>{videoDetails?.channelInfo?.name}</h2>
                        </Link>
                        <h1 className='text-gray-400'>{videoDetails?.channelInfo?.subCount} subscribers</h1>
                    </div>
                </div>

                <div className="flex gap-3 items-center sm:text-lg text-md sm:mt-0 mt-2">
                    <div className="flex items-center gap-2 cursor-pointer bg-neutral-800 py-2 px-3 rounded-full">
                        <BiLike />
                        <div className='h-6 border'></div>
                        <span>{videoDetails?.videoLikes}</span>
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer  bg-neutral-800 py-2 px-3 rounded-full">
                        <FaShare />
                        <span>share</span>
                    </div>
                </div>
            </div>

            <div className="sm:text-lg text-md bg-neutral-700 py-2 px-3 rounded-xl">
                <div className='flex  gap-3 font-semibold'>
                    <span>{videoDetails?.videoViews} views</span>
                    <span>{videoDetails?.videoAge}</span>
                </div>
                <p>
                    <p className={`whitespace-pre-line ${showDescription == true ? `` : `sm:line-clamp-5 line-clamp-3`}`}>{videoDetails?.videoDescription}</p>
                    <button
                        className='px-1 text-neutral-300'
                        onClick={() => setShowDescription(!showDescription)}
                    >
                        ...more
                    </button>
                </p>
            </div>

        </div>)
}

export default WatchDetails