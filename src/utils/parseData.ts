import { ChannelInfoType, PlaylistType } from './Types';

export const parseChannelInfo = (channelData: any): ChannelInfoType => {
    return {
        id: channelData.id,
        title: channelData.snippet.title,
        description: channelData.snippet.description,
        customUrl: channelData.snippet.customUrl || '',
        thumbnails: {
            default: { url: channelData.snippet.thumbnails.default.url },
            medium: { url: channelData.snippet.thumbnails.medium.url },
            high: { url: channelData.snippet.thumbnails.high.url },
        },
        subscriberCount: channelData.statistics.subscriberCount,
        videoCount: channelData.statistics.videoCount,
        // playListsCount: playListsCount
    };
};

export const parsePlaylists = (playlistsData: any[]): PlaylistType[] => {
    return playlistsData.map((playlist: any) => ({
        id: playlist.id,
        title: playlist.snippet.title,
        description: playlist.snippet.description,
        thumbnails: {
            default: { url: playlist.snippet.thumbnails.default.url },
            medium: { url: playlist.snippet.thumbnails.medium.url },
            high: { url: playlist.snippet.thumbnails.high.url },
        },
        videosCount: playlist.contentDetails.itemCount, // Assuming itemCount represents number of videos
    }));
};