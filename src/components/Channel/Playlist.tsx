import React, { useState } from 'react'
import { ChannelInfoType, PlaylistType } from '../../utils/Types'
import PlaylistCard from './PlaylistCard';

interface PlayListprops {
    playlists: PlaylistType[],
    channelInfo: ChannelInfoType
}

function Playlist({ playlists, channelInfo }: PlayListprops) {

    return (
        <div className="row row-cols-lg-4 row-cols-sm-3 row-cols-2 gap-y-4 cursor-pointer">
            {playlists.length > 0 &&
                playlists.map((playlist) => (
                    <PlaylistCard key={playlist.id} playlist={playlist} channelInfo={channelInfo} />
                ))
            }
        </div>
    )
}

export default Playlist