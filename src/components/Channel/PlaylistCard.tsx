import React from 'react'
import { Link } from 'react-router-dom';
import { FaListUl } from "react-icons/fa";
import { PlaylistType, ChannelInfoType } from '../../utils/Types';

interface PlayListCardprops {
    playlist: PlaylistType,
    channelInfo: ChannelInfoType
}


function PlaylistCard({ playlist, channelInfo }: PlayListCardprops) {
    return (
        <div className='flex flex-col gap-2'>
            <Link to={`/playlist/${channelInfo.id}/${playlist.id}`}>
                <div className="relative rounded-xl overflow-hidden">
                    <img
                        src={playlist.thumbnails.high.url}
                        alt={playlist.title}
                        className=' aspect-[16/9] object-cover'
                    />
                    <div className="absolute bottom-3 right-3 ">
                        <div className="flex items-center gap-2 text-sm bg-[#0c0c0cd0] px-2 py-0.5 rounded">
                            <FaListUl />
                            <div className="">{playlist.videosCount} videos</div>
                        </div>
                    </div>
                    <div className="absolute top-0 bg-[#0c0c0c] w-full h-full opacity-[10%] hover:opacity-[80%] duration-100 flex items-center w-full">
                        <div className="mx-auto text-xl">View</div>
                    </div>
                </div>
                <h3 className='font-semibold line-clamp-2'>{playlist.title}</h3>
            </Link>
        </div>
    )
}

export default PlaylistCard