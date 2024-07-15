
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

// fetch
// https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyASRfKJDWiZipN6jgj3Inahkr4P0ZtDz20&playlistId=PLVKLWop9wWA9cshqSSj1uP7K8jKWFKt47&part=snippet,contentDetails
// to get specifit playlist details vith all videos
// by passing playlistId as query

// it returns
// {
//     "kind": "youtube#playlistItemListResponse",
//     "etag": "dtKYwjdijbdaK0ClrdjyCEZgO28",
//     "nextPageToken": //next page token
// "EAAajgFQVDpDQVVpRURsRk9ERTBORUV6TlRCR05EUXdPRUlvQVVpeG12VDV0b3FHQTFBQldrVWlRMmxLVVZSR1dreFVSbVIyWTBSc00xWXdSVFZaTTA1dlkxWk9WR0ZxUmpGVlJHUk1UMGR3VEZZd1dreGtSRkV6UldkM1NYZzViVWh6WjFsUk5rbE1RM0IzVFNJ",
//     "items": [
//         {
//             "kind": "youtube#playlistItem",
//             "etag": "CFJJR7ZO1OIGLG0EYX0Q-GJ22Bk",
//             "id": "UExWS0xXb3A5d1dBOWNzaHFTU2oxdVA3SzhqS1dGS3Q0Ny45NzUwQkI1M0UxNThBMkU0",
//             "snippet": {
//                 "publishedAt": "2024-05-12T12:48:49Z",
//                 "channelId": "UCWX0cUR2rZcqKei1Vstww-A", //channelId
//                 "title": "This got me rejected in a Remote Job Interview", // VideoTitle
//                //video description "description": "Are you thinking about getting a job as a software developer that lets you work from home? This video is just what you need. \n\nWe'll talk about what it really takes to find a remote job in software development. \n\nWhether you're just starting out or you've been in the field for a while and want to work from home, this video will give you helpful advice to find the right remote job for you.\n\nLink to a decent camera - https://www.amazon.in/Logitech-C920-Pro-Webcam-Microphones/dp/B006JH8T3S/\n\nLinks:\nOpen Source Cohort: https://harkirat.classx.co.in/\nTwitter:https://twitter.com/kirat_tw\nLinkedin:https://linkedin.com/in/kirat-li\nInstagram:https://www.instagram.com/kirat_ins/\nDiscord:https://discord.com/invite/WAaXacK9bh\nTelegram: https://t.me/kirat_internal_group\n\n\nTimestamps:-\n\n00:00 - Intro\n00:15 - In this video\n00:33 - Three factors why would you want a remote job?\n01:30 - Step 1. Things to keep in mind\n03:26 - Prerequisite for a remote job interview\n11:41 - Recap.\n12:23 - Outro",
//                 "thumbnails": { //Video thumbnail
//                     "default": {
//                         "url": "https://i.ytimg.com/vi/GKxNUmIOebc/default.jpg",
//                         "width": 120,
//                         "height": 90
//                     },
//                     "medium": {
//                         "url": "https://i.ytimg.com/vi/GKxNUmIOebc/mqdefault.jpg",
//                         "width": 320,
//                         "height": 180
//                     },
//                     "high": {
//                         "url": "https://i.ytimg.com/vi/GKxNUmIOebc/hqdefault.jpg",
//                         "width": 480,
//                         "height": 360
//                     },
//                     "standard": {
//                         "url": "https://i.ytimg.com/vi/GKxNUmIOebc/sddefault.jpg",
//                         "width": 640,
//                         "height": 480
//                     },
//                     "maxres": {
//                         "url": "https://i.ytimg.com/vi/GKxNUmIOebc/maxresdefault.jpg",
//                         "width": 1280,
//                         "height": 720
//                     }
//                 },
//                 "channelTitle": "Harkirat Singh", //channelName
//                 "playlistId": "PLVKLWop9wWA9cshqSSj1uP7K8jKWFKt47", //playlistId
//                 "position": 0,
//                 "resourceId": {
//                     "kind": "youtube#video",
//                     "videoId": "GKxNUmIOebc" //videoId
//                 },
//                 "videoOwnerChannelTitle": "Harkirat Singh",
//                 "videoOwnerChannelId": "UCWX0cUR2rZcqKei1Vstww-A"
//             },
//             "contentDetails": {
//                 "videoId": "GKxNUmIOebc",
//                 "videoPublishedAt": "2024-04-22T13:59:18Z"
//             }
//         },
//         {
//             "kind": "youtube#playlistItem",
//             "etag": "jKzAyrCnngu6b7pWwbKES5mX0bA",
//             "id": "UExWS0xXb3A5d1dBOWNzaHFTU2oxdVA3SzhqS1dGS3Q0Ny4zRjM0MkVCRTg0MkYyQTM0",

// just get the video Id from here