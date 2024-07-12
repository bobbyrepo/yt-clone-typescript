import { BASE_URL } from "./constants";
import axios from "axios";
import { HomeVideoType } from "./Types";
import { getDuration } from "./getDuration";

const API_KEY = import.meta.env.VITE_API_KEY

export const getAllVideoData = async (videos: any[]) => {

    const channelIds: string[] = [];
    const videoIds: string[] = [];


    videos.forEach(
        (item: { snippet: { channelId: string }; id: string }) => {
            channelIds.push(item.snippet.channelId);
            videoIds.push(item.id);
        }
    );


    const {
        data: { items: channelsData },
    } = await axios.get(
        `${BASE_URL}/channels?part=snippet,contentDetails&id=${channelIds.join(",")}&key=${API_KEY}`
    );

    const {
        data: { items: videosData },
    } = await axios.get(
        `${BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(",")}&key=${API_KEY}`
    );


    const allData: HomeVideoType[] = [];
    videos.forEach((video) => {
        const channelData = channelsData.find(
            (channel: { id: string }) => channel.id === video.snippet.channelId
        );
        const VideoData = videosData.find(
            (vid: { id: string }) => vid.id === video.id
        );

        // console.log(video.id, VideoData)

        allData.push({
            videoId: VideoData?.id,
            videoTitle: VideoData?.snippet?.title,
            videoDescription: VideoData?.snippet?.description,
            videoLink: `https://www.youtube.com/watch?v=${VideoData?.id}`,
            videoThumbnail: VideoData?.snippet?.thumbnails?.standard?.url,
            videoDuration: getDuration(VideoData?.contentDetails?.duration),
            videoViews: VideoData?.statistics?.viewCount,
            videoAge: new Date(VideoData?.snippet?.publishedAt).toDateString(),
            channelInfo: {
                id: VideoData?.snippet?.channelId,
                image: channelData?.snippet?.thumbnails?.default?.url,
                name: VideoData?.snippet?.channelTitle,
            }
        })
    });
    return allData
};