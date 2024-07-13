import { HomeVideoType } from '../utils/Types'
import { BiLike } from "react-icons/bi";
import { FaShare } from "react-icons/fa";

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

        </div>)
}

export default WatchDetails