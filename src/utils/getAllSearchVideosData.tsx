import { BASE_URL } from "./constants";
import axios, { all } from "axios";
import { HomeVideoType, RecommendedVideoType } from "./Types";
import { getDuration } from "./getDuration";

const API_KEY = import.meta.env.VITE_API_KEY

export const getAllSearchVideosData = async (videos: any[]) => {


    const channelIds: string[] = [];
    const videoIds: string[] = [];


    videos.forEach(
        (item: { snippet: { channelId: string }; id: { videoId: string } }) => {
            channelIds.push(item.snippet.channelId);
            videoIds.push(item.id.videoId);
        }
    );

    // console.log(channelIds)
    // console.log(videoIds)


    const {
        data: { items: channelsData },
    } = await axios.get(
        `${BASE_URL}/channels?part=snippet,contentDetails,statistics&id=${channelIds.join(",")}&key=${API_KEY}`
    );

    // console.log(channelsData)

    const {
        data: { items: videosData },
    } = await axios.get(
        `${BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(",")}&key=${API_KEY}`
    );

    // console.log(videosData)

    // videosData.forEach(element => {
    //     console.log("Duration", element.contentDetails.duration)
    // });

    const allData: HomeVideoType[] = [];
    const videoIdsSet = new Set<string>();  // Set to store unique video IDs

    videos.forEach((video) => {
        const channelData = channelsData.find(
            (channel: { id: string }) => channel.id === video.snippet.channelId
        );
        const VideoData = videosData.find(
            (vid: { id: string }) => vid.id === video.id.videoId
        );

        // Check if the video ID exists and if it has already been added
        if (VideoData?.id && !videoIdsSet.has(VideoData.id)) {
            videoIdsSet.add(VideoData.id);  // Add the video ID to the set

            allData.push({
                videoId: VideoData.id,
                videoTitle: VideoData.snippet.title,
                videoDescription: VideoData.snippet.description,
                videoLink: `https://www.youtube.com/watch?v=${VideoData.id}`,
                videoThumbnail: VideoData.snippet.thumbnails?.standard?.url,
                videoDuration: VideoData.contentDetails?.duration,
                videoViews: VideoData.statistics?.viewCount,
                videoLikes: VideoData.statistics?.likeCount,
                videoAge: new Date(VideoData.snippet.publishedAt).toDateString(),
                channelInfo: {
                    id: VideoData.snippet.channelId,
                    image: channelData?.snippet?.thumbnails?.default?.url,
                    name: VideoData.snippet.channelTitle,
                    subCount: channelData?.statistics?.subscriberCount,
                }
            });
        }
    });
    return allData
};
