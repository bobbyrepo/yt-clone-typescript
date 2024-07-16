import { useState } from 'react';
import { PlaylistType } from '../utils/Types';
import { parseSinglePlaylist } from '../utils/parseData';
import { fetchSinglePlaylist } from '../utils/api';

export const useSinglePlaylist = () => {
    const [playlist, setPlaylist] = useState<PlaylistType>();

    const getPlaylistDetails = async (playlistId: string) => {
        try {
            const playlistResponse = await fetchSinglePlaylist(playlistId)
            const parsedPlaylist = parseSinglePlaylist(playlistResponse.items[0])
            setPlaylist(parsedPlaylist)
        }
        catch (error) {
            console.error('Error fetching playlist data:', error);
        }
    }

    return { playlist, getPlaylistDetails }
}

