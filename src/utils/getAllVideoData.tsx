import { BASE_URL } from "./constants";
import axios from "axios";
import { HomeVideoType } from "./Types";
import { getDuration } from "./getDuration";

const API_KEY = import.meta.env.VITE_API_KEY

export const getAllVideoData = async (videos: any[]) => {

    // console.log("first", videos)

    const channelIds: string[] = [];
    const videoIds: string[] = [];


    videos.forEach(
        (item: { snippet: { channelId: string }; id: { videoId: string } }) => {
            channelIds.push(item.snippet.channelId);
            videoIds.push(item.id.videoId);
        }
    );


    // console.log(videoIds)
    const {
        data: { items: channelsData },
    } = await axios.get(
        `${BASE_URL}/channels?part=snippet,contentDetails&id=${channelIds.join(",")}&key=${API_KEY}`
    );


    const {
        data
    } = await axios.get(
        `${BASE_URL}/videos?part=contentDetails,statistics&id=${videoIds.join(",")}&key=${API_KEY}`
    );

    // console.log(data)

    const allData: HomeVideoType[] = [];
    videos.forEach((video) => {
        const aa = channelsData.find(
            (channel: { id: string }) => channel.id === video.snippet.channelId
        );

        allData.push({
            videoId: video?.id,
            videoTitle: video?.snippet?.title,
            videoDescription: video?.snippet?.description,
            videoLink: `https://www.youtube.com/watch?v=${video?.id}`,
            videoThumbnail: video?.snippet?.thumbnails?.standard?.url,
            videoDuration: getDuration(video?.contentDetails?.duration),
            videoViews: video?.statistics?.viewCount,
            videoAge: new Date(video?.snippet?.publishedAt).toDateString(),
            channelInfo: {
                id: video?.snippet?.channelId,
                image: aa?.snippet?.thumbnails?.default?.url,
                name: video?.snippet?.channelTitle,
            }
        })
    });
    return allData
};