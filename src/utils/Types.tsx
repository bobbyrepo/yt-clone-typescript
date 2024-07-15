
export interface HomeVideoType {
    videoId: string;
    videoTitle: string;
    videoDescription: string;
    videoLink: string;
    videoThumbnail: string;
    videoDuration?: string;
    videoViews: string;
    videoLikes: string;
    videoAge: string;
    channelInfo: {
        id: string;
        image: string;
        name: string;
        subCount: string
    };
}
export interface RecommendedVideoType {
    videoId: string;
    videoTitle: string;
    videoLink: string;
    videoThumbnail: string;
    videoDuration?: string;
    videoViews: string;
    videoAge: string;
    channelInfo: {
        id: string;
        name: string;
    };
}

export interface searchListType {
    videos: HomeVideoType[];
    nextPageToken: null | string;
}

export interface ChannelInfoType {
    id: string;
    title: string;
    description: string;
    customUrl: string;
    thumbnails: {
        default: { url: string };
        medium: { url: string };
        high: { url: string };
    };
    subscriberCount: string;
    videoCount: string;
    playListsCount?: number;
}

export interface PlaylistType {
    id: string;
    title: string;
    description: string;
    thumbnails: {
        default: { url: string };
        medium: { url: string };
        high: { url: string };
    };
    videosCount: number;
}