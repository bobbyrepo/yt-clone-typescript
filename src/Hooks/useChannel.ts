import React, { useEffect, useState } from 'react';
import { ChannelInfoType, RecommendedVideoType } from '../utils/Types';
import { PlaylistType } from '../utils/Types';
import { fetchChannelInfo, fetchChannelVideos, fetchPlaylists } from '../utils/api';
import { parseChannelInfo, parsePlaylists } from '../utils/parseData';
import { getAllRecommendedVideosdata } from '../utils/getAllRecommendedVideosdata';

interface PlaylistState {
    videos: PlaylistType[],
    nextPageToken: null | string
};
interface VideoListState {
    videos: RecommendedVideoType[],
    nextPageToken: null | string
};

export const useChannel = () => {

    const [channelInfo, setChannelInfo] = useState<ChannelInfoType | null>(null);
    const [playlists, setPlaylists] = useState<PlaylistState>({ videos: [], nextPageToken: null });
    const [videosList, setVideosList] = useState<VideoListState>({ videos: [], nextPageToken: null })
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);

    const fetchChannelData = async (channelId: string, category?: string) => {
        try {
            const channelResponse = await fetchChannelInfo(channelId);
            const channelData = parseChannelInfo(channelResponse);
            setChannelInfo(channelData);

            if (category == "videos") {
                const channelVideosResponse = await fetchChannelVideos(channelId);

                const mappedVideos = await getAllRecommendedVideosdata(channelVideosResponse.items);
                setVideosList(prev => ({
                    videos: [...prev.videos, ...mappedVideos],
                    nextPageToken: channelVideosResponse.nextPageToken,
                }))
                setHasMore(Boolean(channelVideosResponse.nextPageToken));
            }

            if (category == "playlists") {
                const playlistResponse = playlists.nextPageToken
                    ? await fetchPlaylists(channelId, playlists.nextPageToken)
                    : await fetchPlaylists(channelId);


                const newPlaylists = parsePlaylists(playlistResponse.items);
                setPlaylists((prevData) => ({
                    videos: [...prevData.videos, ...newPlaylists],
                    nextPageToken: playlistResponse.nextPageToken,
                }));
                setHasMore(Boolean(playlistResponse.nextPageToken));
            }

        } catch (error) {
            console.error('Error fetching channel data:', error);
        } finally {
            setLoading(false);
        }
    };


    return { channelInfo, playlists, videosList, fetchChannelData, loading, hasMore }

};