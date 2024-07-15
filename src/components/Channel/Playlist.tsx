import React, { useState } from 'react'
import { PlaylistType } from '../../utils/Types'
import PlaylistCard from './PlaylistCard';

interface PlayListprops {
    playlists: PlaylistType[]
}

function Playlist({ playlists }: PlayListprops) {

    return (
        <div className="row row-cols-5 gap-y-8 cursor-pointer">
            {playlists.length > 0 &&
                playlists.map((playlist) => (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                ))
            }
        </div>
    )
}

export default Playlist