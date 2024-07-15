import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Playlist from '../components/Channel/Playlist';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useChannel } from '../Hooks/useChannel';
import VideoList from '../components/Channel/VideoList';

function Channel() {
    const { channelId } = useParams();
    const { channelInfo, playlists, videosList, fetchChannelData, loading, hasMore } = useChannel()
    const [category, setcategory] = useState<string>("videos");

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
        <div>
            <InfiniteScroll
                dataLength={category === "videos" ? videosList.videos.length : playlists.videos.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<Spinner />}
                height={740}
                endMessage={<div className='text-center text-xl text-[#555]'> No more items to display</div>}

            >
                <div className='w-[95%] mx-auto mt-20'>
                    <div className="flex gap-4 mx-8">
                        <img
                            src={channelInfo.thumbnails.high.url}
                            alt={channelInfo.title}
                            className='w-52 h-fit aspect-[1/1] rounded-full'
                        />
                        <div className="flex flex-col gap-2">
                            <h1 className='text-4xl font-semibold'>{channelInfo.title}</h1>
                            <p className='flex gap-2 text-lg text-neutral-400'>
                                <span>{channelInfo.customUrl}</span>
                                <span>•</span>
                                <span>{channelInfo.subscriberCount} subscribers</span>
                                <span>•</span>
                                <span>{channelInfo.videoCount} videos</span>
                            </p>
                            <div>
                                <p className='w-[600px] line-clamp-3 whitespace-pre-line text-neutral-400'>{channelInfo.description}</p>
                                <p className='font-semibold'>more</p>
                            </div>
                        </div>
                    </div>
                    <div className="my-3 flex flex-col">
                        <div className="flex">
                            {/* {Boolean(videosList?.videos.length) && */}
                            <button
                                onClick={() => setcategory("videos")}
                                className={`w-44 text-xl py-2 font-semibold ${category == "videos" ? `border-b` : ""}  duration-100 ease-in-out`}
                            >
                                Videos
                            </button>
                            {/* } */}
                            {/* {Boolean(playlists?.videos.length) && */}
                            <button
                                onClick={() => setcategory("playlists")}
                                className={`w-44 text-xl py-2 font-semibold ${category == "playlists" ? `border-b` : ""}  duration-100 ease-in-out`}
                            >
                                Playlists
                            </button>
                            {/* } */}
                        </div>
                        <hr className='h-1' />
                    </div>
                    {
                        category == "videos"
                            ? <VideoList videoList={videosList.videos} />
                            : <Playlist playlists={playlists.videos} />
                    }
                </div>
            </InfiniteScroll>
        </div>
    );
}

export default Channel;
