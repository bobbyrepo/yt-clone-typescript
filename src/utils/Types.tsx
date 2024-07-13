
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