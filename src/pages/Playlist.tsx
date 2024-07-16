import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../components/Spinner';
import { useSinglePlaylist } from '../Hooks/useSinglePlaylist';
import { usePlaylistVideos } from '../Hooks/usePlaylistVideos';
import PlaylistVideoCard from '../components/Playlist/PlaylistVideoCard';

function Playlist() {
    const { playlistId } = useParams()
    const { playlist, getPlaylistDetails } = useSinglePlaylist()
    const { playlistVideos, getPlaylistVideos, loading, hasMore } = usePlaylistVideos()

    const loadVideos = () => {
        if (playlistId) {
            getPlaylistVideos(playlistId)
        }
    }

    useEffect(() => {
        getPlaylistDetails(playlistId!)
        loadVideos()
    }, [playlistId]);

    return (
        <div>
            <InfiniteScroll
                dataLength={playlistVideos.videos.length}
                next={loadVideos}
                hasMore={hasMore}
                loader={<Spinner />}
                height={720}
                endMessage={<div className='text-center text-xl text-[#555]'> No more items to display</div>}

            >
                <div className='w-[90%] mx-auto'>
                    <div className="flex flex-col gap-4 my-4">
                        <div className="row bg-neutral-900 p-5 rounded-xl">
                            <img src={playlist?.thumbnails?.high.url}
                                className="col-4 aspect-[18/9] object-cover rounded-xl"
                                alt=""
                            />
                            <div className="col-8 flex flex-col gap-2">
                                <h1 className='text-2xl font-semibold'>{playlist?.title}</h1>
                                <p className='text-xl text-semibold text-neutral-400'>
                                    {playlist?.videosCount} videos
                                </p>
                                {playlist?.description &&
                                    <div className='bg-neutral-800 p-2 rounded'>
                                        <p className='text-lg text-neutral-400 line-clamp-4 whitespace-pre-line '>{playlist?.description}
                                        </p>
                                        <p className='font-semibold'>...more</p>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='row row-cols-4 gap-y-6'>
                            {
                                playlistVideos?.videos?.map((item, ind) => (
                                    <PlaylistVideoCard key={ind} item={item} ind={ind} />
                                ))
                            }
                        </div>

                    </div>
                </div >
            </InfiniteScroll >
        </div>
    )
}

export default Playlist