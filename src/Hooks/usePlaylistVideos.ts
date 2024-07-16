import { useState } from 'react';
import { PlaylistItemType } from '../utils/Types';
import { fetchPlaylistVideos } from '../utils/api';
import { parsePlaylistitem } from '../utils/parseData';

export const usePlaylistVideos = () => {
    const [playlistVideos, setPlaylistVideos] = useState<{ videos: PlaylistItemType[], nextPageToken: null | string }>({ videos: [], nextPageToken: null })
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);

    const getPlaylistVideos = async (playlistId: string, pageToken?: string) => {
        try {
            const playlistVideosResponse = await fetchPlaylistVideos(playlistId, pageToken)

            const parsedPlaylistVideos = parsePlaylistitem(playlistVideosResponse.items)

            setPlaylistVideos(prev => ({
                videos: [...prev.videos, ...parsedPlaylistVideos],
                nextPageToken: playlistVideosResponse.nextPageToken
            }))

            setHasMore(Boolean(playlistVideosResponse.nextPageToken));

        } catch (error) {
            console.error('Error fetching playlist videos:', error);
        } finally {
            setLoading(false);
        }
    }
    return { playlistVideos, getPlaylistVideos, loading, hasMore }
}