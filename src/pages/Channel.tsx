import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Playlist from '../components/Channel/Playlist';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ChannelInfoType, PlaylistType } from '../utils/Types';
import { fetchChannelInfo, fetchPlaylists } from '../utils/api';
import { parseChannelInfo, parsePlaylists } from '../utils/parseData';

interface VideoListState {
    videos: PlaylistType[],
    nextPageToken: null | string
};

function Channel() {
    const { channelId } = useParams();
    const [category, setcategory] = useState<string>("videos");
    const [channelInfo, setChannelInfo] = useState<ChannelInfoType | null>(null);
    const [playlistsData, setPlaylistsData] = useState<VideoListState>({ videos: [], nextPageToken: null });
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    const fetchChannelData = async (channelId: string) => {
        try {
            const channelResponse = await fetchChannelInfo(channelId);
            const playlistResponse = playlistsData.nextPageToken
                ? await fetchPlaylists(channelId, playlistsData.nextPageToken)
                : await fetchPlaylists(channelId);

            const channelData = parseChannelInfo(channelResponse, playlistResponse.pageInfo.totalResults);
            setChannelInfo(channelData);

            const newPlaylists = parsePlaylists(playlistResponse.items);
            setPlaylistsData((prevData) => ({
                videos: [...prevData.videos, ...newPlaylists],
                nextPageToken: playlistResponse.nextPageToken,
            }));

            setHasMore(Boolean(playlistResponse.nextPageToken));
        } catch (error) {
            console.error('Error fetching channel data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMoreData = () => {
        if (channelId) {
            fetchChannelData(channelId);
        }
    };

    useEffect(() => {
        fetchMoreData()
    }, [channelId]);

    if (loading) {
        return <Spinner />;
    }

    if (!channelInfo) {
        return <div>Channel not found</div>;
    }

    return (
        <div>
            <InfiniteScroll
                dataLength={playlistsData.videos.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<Spinner />}
                height={740}
                endMessage={<p>No more playlists found</p>}
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
                            <button
                                onClick={() => setcategory("videos")}
                                className={`w-44 text-xl py-2 font-semibold ${category == "videos" ? `border-b` : ""}  duration-100 ease-in-out`}
                            >
                                Videos
                            </button>
                            <button
                                onClick={() => setcategory("playlists")}
                                className={`w-44 text-xl py-2 font-semibold ${category == "playlists" ? `border-b` : ""}  duration-100 ease-in-out`}
                            >
                                Playlists
                            </button>
                        </div>
                        <hr className='h-1' />
                    </div>
                    <Playlist playlists={playlistsData.videos} />
                </div>
            </InfiniteScroll>
        </div>
    );
}

export default Channel;
