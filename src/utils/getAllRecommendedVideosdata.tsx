import { BASE_URL } from "./constants";
import axios, { all } from "axios";
import { HomeVideoType, RecommendedVideoType } from "./Types";
import { getDuration } from "./getDuration";

const API_KEY = import.meta.env.VITE_API_KEY

export const getAllRecommendedVideosdata = async (videos: any[], videoId?: string) => {

    // console.log("first", videos)

    const videoIds: string[] = [];


    videos.forEach(
        (item: { contentDetails: { upload: { videoId: string } } }) => {
            videoIds.push(item?.contentDetails?.upload?.videoId);
        }
    );


    // console.log(videoIds)

    const {
        data: { items: videosData },
    } = await axios.get(
        `${BASE_URL}/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(",")}&key=${API_KEY}`
    );


    // console.log(videosData)


    const allData: RecommendedVideoType[] = [];
    videosData.forEach((video: any) => {
        if (video.id !== videoId) {
            allData.push({
                videoId: video.id,
                videoTitle: video.snippet.title,
                videoLink: `https://www.youtube.com/watch?v=${video?.id}`,
                videoThumbnail: video.snippet.thumbnails.medium.url,
                videoDuration: getDuration(video.contentDetails.duration),
                videoViews: video.statistics.viewCount,
                videoAge: new Date(video.snippet.publishedAt).toDateString(),
                channelInfo: {
                    id: video.snippet.channelId,
                    name: video.snippet.channelTitle,
                },
            });
        }
    });

    // console.log(allData)

    return allData
};