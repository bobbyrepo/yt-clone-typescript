import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Playlist from '../components/Channel/Playlist';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useChannel } from '../Hooks/useChannel';
import VideoList from '../components/Channel/VideoList';
import { AiOutlineClose } from "react-icons/ai";

function Channel() {
    const { channelId } = useParams();
    const { channelInfo, playlists, videosList, fetchChannelData, loading, hasMore } = useChannel()
    const [category, setcategory] = useState<string>("videos");
    const [showDetails, setShowDetails] = useState(false);

    const fetchMoreData = () => {
        if (channelId) {
            fetchChannelData(channelId, category);
        }
    };

    useEffect(() => {
        fetchMoreData()
    }, [channelId, category]);

    if (loading) {
        return <Spinner />;
    }

    if (!channelInfo) {
        return <div>Channel not found</div>;
    }

    return (
        <div className='relative'
            onClick={() => { showDetails && setShowDetails(false) }}
        >
            {showDetails &&
                <div className="absolute z-[11] bg-neutral-800 rounded-xl overflow-hidden left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="flex flex-col gap-2 items-end w-[600px] h-fit max-h-[500px] px-8 py-8  overflow-y-auto">
                        <div className="">
                            <AiOutlineClose className="sm:text-2xl text-xl text-neutral-200" />
                        </div>
                        <p className="text-lg">{channelInfo.description}</p>
                    </div>
                </div>
            }
            <InfiniteScroll
                dataLength={category === "videos" ? videosList.videos.length : playlists.videos.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<Spinner />}
                height={740}
                endMessage={<div className='text-center text-xl text-[#555]'> No more items to display</div>}

            >
                <div className='w-[95%] mx-auto md:mt-20 mt-8'>
                    <div className="flex md:flex-row flex-col gap-4 mx-8">
                        <img
                            src={channelInfo.thumbnails.high.url}
                            alt={channelInfo.title}
                            className='md:w-52 sm:w-40 w-36 sm:mx-0 mx-auto h-fit aspect-[1/1] rounded-full'
                        />
                        <div className="flex flex-col gap-2">
                            <h1 className='md:text-4xl sm:text-3xl text-2xl font-semibold'>{channelInfo.title}</h1>
                            <p className='sm:flex gap-4 sm:text-lg text-md text-neutral-400'>
                                <p>{channelInfo.customUrl}</p>
                                <p>{channelInfo.subscriberCount} subscribers</p>
                                <p>{channelInfo.videoCount} videos</p>
                            </p>
                            <div>
                                <p className='max-w-[600px] line-clamp-3 whitespace-pre-line text-neutral-400'>{channelInfo.description}</p>
                                <button className='font-semibold'
                                    onClick={() => setShowDetails(true)}
                                >more</button>
                            </div>
                        </div>
                    </div>
                    <div className="sm:my-3 my-1 flex flex-col">
                        <div className="flex">
                            <button
                                onClick={() => setcategory("videos")}
                                className={`md:w-44 w-32 sm:text-xl text-lg py-2 font-semibold ${category == "videos" ? `border-b` : ""}  duration-100 ease-in-out`}
                            >
                                Videos
                            </button>
                            <button
                                onClick={() => setcategory("playlists")}
                                className={`md:w-44 w-32 sm:text-xl text-lg py-2 font-semibold ${category == "playlists" ? `border-b` : ""}  duration-100 ease-in-out`}
                            >
                                Playlists
                            </button>
                        </div>
                        <hr className='h-1' />
                    </div>
                    {
                        category == "videos"
                            ? <VideoList videoList={videosList.videos} />
                            : <Playlist playlists={playlists.videos} channelInfo={channelInfo} />
                    }
                </div>
            </InfiniteScroll>
        </div>
    );
}

export default Channel;
