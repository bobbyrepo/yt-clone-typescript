import React from 'react'
import { HomeVideoType } from '../utils/Types'
import { BiLike, BiDislike } from "react-icons/bi";
import { HiScissors } from "react-icons/hi";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

function WatchDetails({ videoDetails }: { videoDetails?: HomeVideoType }) {
    return (
        <div className="flex flex-col gap-3 mt-2 mx-1">
            <h1 className="text-2xl font-semibold">{videoDetails?.videoTitle}</h1>

            <div className="flex items-center justify-between">
                <div className="flex gap-3 items-center">
                    <img src={videoDetails?.channelInfo?.image}
                        className='w-12 h-fit aspect-[1/1] rounded-full'
                        alt="channelImage" />

                    <div className="flex flex-col ">
                        <h2 className='text-lg font-semibold'>{videoDetails?.channelInfo?.name}</h2>
                        <h1 className='text-gray-400'>{videoDetails?.channelInfo?.subCount} subscribers</h1>
                    </div>
                </div>

                <div className="flex gap-3 items-center">
                    <div className="flex items-center gap-2 cursor-pointer bg-neutral-800 py-2 px-3 rounded-full">
                        <BiLike className="text-xl" />
                        <div className='h-6 border'></div>
                        <span>{videoDetails?.videoLikes}</span>
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer  bg-neutral-800 py-2 px-3 rounded-full">
                        <FaShare className="text-xl" />
                        <span>share</span>
                    </div>
                </div>
            </div>

            <div className="bg-neutral-700 py-2 px-3 rounded-xl">
                <div className='flex  gap-3 font-semibold'>
                    <span>{videoDetails?.videoViews} views</span>
                    <span>{videoDetails?.videoAge}</span>
                </div>
                <p className='whitespace-pre-line'>{videoDetails?.videoDescription}</p>
            </div>

            {/* <div className="flex justify-between mt-1">
                <div className="text-sm text-gray-400">
                    <span className="after:content-['•'] after:mx-1">
                        {videoDetails?.videoViews} views
                    </span>
                    <span> {videoDetails?.videoAge} ago</span>
                </div>
                <div className="flex items-center gap-4 uppercase">
                    <div className="flex items-center gap-1 cursor-pointer">
                        <BiLike className="text-xl" />
                        <strong>{videoDetails?.videoLikes}</strong>
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer">
                        <FaShare className="text-xl" />
                        <strong>share</strong>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 flex-col border-solid border-gray-400 border-2 my-5 pb-3 border-l-transparent border-r-transparent">
                <div className="flex items-center gap-5 mr-5 mt-4">
                    <div>
                        <img
                            src={videoDetails?.channelInfo?.image}
                            alt=""
                            className="rounded-full h-12 w-12"
                        />
                    </div>
                    <div className="w-5/6">
                        <h5 className="text-sm">
                            <strong>{videoDetails?.channelInfo?.name}</strong>
                        </h5>
                        <h6 className="text-gray-400 text-xs">
                            {videoDetails?.channelInfo?.subCount} subscribers
                        </h6>
                    </div>
                    <div>
                        <button className="uppercase bg-red-600 rounded-sm p-2 text-sm tracking-wider">
                            subscribe
                        </button>
                    </div>
                </div>
            <div
                    className={`${!showMoreStatus ? "max-h-16 overflow-hidden" : ""
                        } text-sm w-11/12`}
                >
                    <pre
                        style={{
                            fontFamily: `"Roboto", sans-serif`,
                        }}
                        className="whitespace-pre-wrap"
                    >
                        {videoDetails.videoDescription}
                    </pre>
                </div> 
                <div>
                    <button
                        className="uppercase text-sm cursor-pointer"
                        onClick={() => setShowMoreStatus(!showMoreStatus)}
                    >
                        Show {showMoreStatus ? "less" : "more"}
                    </button>
                </div> 
            </div> */}
        </div>)
}

export default WatchDetails