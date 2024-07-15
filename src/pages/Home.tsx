import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../components/Spinner';
import Card from '../components/Card';
import { BASE_URL } from '../utils/constants';
import { HomeVideoType } from '../utils/Types';
import { getAllVideoData } from '../utils/getAllVideoData';
import Sidebar from '../components/Sidebar';
import { getAllSearchVideosData } from '../utils/getAllSearchVideosData';
import { fetchPopularVideos } from '../utils/api';

const API_KEY = import.meta.env.VITE_API_KEY;

interface HomeProps {
    filter: string;
    categoryId: string | null;
}

interface HomeVideosState {
    videos: HomeVideoType[],
    nextPageToken: null | string
};

function HomeVideos({ filter, categoryId }: HomeProps) {

    const [filterVideos, setFilterVideos] = useState<Record<string, HomeVideosState>>({
        home: { videos: [], nextPageToken: null },
        music: { videos: [], nextPageToken: null },
        sport: { videos: [], nextPageToken: null },
        gaming: { videos: [], nextPageToken: null },
        movies: { videos: [], nextPageToken: null },
        news: { videos: [], nextPageToken: null },
        fashion: { videos: [], nextPageToken: null },
        course: { videos: [], nextPageToken: null },
    });

    const [error, setError] = useState<string | null>(null);

    const getPopularVideosList = async () => {
        try {
            const popularVideosResponse = await fetchPopularVideos(categoryId, filter, filterVideos[filter].nextPageToken, setError)

            const mappedVideos = await getAllVideoData(popularVideosResponse.items);
            setFilterVideos(prev => ({
                ...prev,
                [filter]: {
                    videos: [...prev[filter].videos, ...mappedVideos],
                    nextPageToken: popularVideosResponse.nextPageToken,
                },
            }));
        } catch (error) {
            console.error(`Error fetching ${filter} videos:`, error);
            setError('Error fetching videos. Please try again later.');
        }
    };

    useEffect(() => {
        getPopularVideosList();
    }, [filter]);


    return (
        <div>
            {error ? (
                <div className="text-center mt-6">
                    <p>{error}</p>
                </div>
            ) : (
                filterVideos[filter].videos.length ? (
                    <InfiniteScroll
                        dataLength={filterVideos[filter].videos.length}
                        next={getPopularVideosList}
                        hasMore={filterVideos[filter].videos.length < 500}
                        loader={<Spinner />}
                        height={680}
                    >
                        <div className="row row-cols-3 w-[95%] mx-auto mt-6">
                            {filterVideos[filter].videos.length > 0 &&
                                filterVideos[filter].videos.map((item: HomeVideoType) => (
                                    <Card data={item} key={item.videoId} />
                                ))}
                        </div>
                    </InfiniteScroll>
                ) : (
                    <Spinner />
                )

            )
            }
        </div >
    );
}

export default HomeVideos;