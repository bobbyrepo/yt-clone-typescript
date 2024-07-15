import React, { useEffect, useState } from 'react';
import { ChannelInfoType } from '../utils/Types';
import { PlaylistType } from '../utils/Types';
import { fetchChannelInfo, fetchPlaylists } from '../utils/api';
import { parseChannelInfo, parsePlaylists } from '../utils/parseData';

interface VideoListState {
    videos: PlaylistType[],
    nextPageToken: null | string
};

export const useChannel = () => {

    const [channelInfo, setChannelInfo] = useState<ChannelInfoType | null>(null);
    const [playlistsData, setPlaylistsData] = useState<VideoListState>({ videos: [], nextPageToken: null });
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);

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


    return { channelInfo, playlistsData, fetchChannelData, loading, hasMore }

};