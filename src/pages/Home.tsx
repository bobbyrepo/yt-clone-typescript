import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../components/Spinner';
import Card from '../components/Card';
import { BASE_URL } from '../utils/constants';
import { HomeVideoType } from '../utils/Types';
import { getAllVideoData } from '../utils/getAllVideoData';
import Sidebar from '../components/Sidebar';

const API_KEY = import.meta.env.VITE_API_KEY;

type HomeVideosState = {
    videos: HomeVideoType[];
    nextPageToken: null | string;
};

function HomeVideos() {
    const [filter, setFilter] = useState<string>("home")
    const [categoryId, setCategoryId] = useState<null | string>(null)

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

    const fetchVideos = async () => {
        try {
            console.log(filter)
            console.log(categoryId)
            console.log(filterVideos[filter].nextPageToken)

            const url = `${BASE_URL}/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=20&key=${API_KEY}&${categoryId != null ? `videoCategoryId=${categoryId}` : ''}&${filterVideos[filter].nextPageToken != null ? `pageToken=${filterVideos[filter].nextPageToken}` : ''}&${filter == "news" ? "regionCode=in" : ""}`

            const response = await axios.get(url);
            if (response.data.error) {
                setError('Videos not available for this filter.');
                return;
            }
            setError("")
            console.log(response);

            const mappedVideos = await getAllVideoData(response.data.items);
            setFilterVideos(prev => ({
                ...prev,
                [filter]: {
                    videos: [...prev[filter].videos, ...mappedVideos],
                    nextPageToken: response.data.nextPageToken,
                },
            }));
        } catch (error) {
            console.error(`Error fetching ${filter} videos:`, error);
            setError('Error fetching videos. Please try again later.');
        }
    };

    useEffect(() => {
        fetchVideos();
    }, [filter, categoryId]);

    // useEffect(() => {
    //     console.log(filterVideos);
    // }, [filterVideos]);

    // useEffect(() => {
    //     console.log(filter);
    //     console.log(categoryId);
    // }, [filter]);

    return (
        <div>
            <div className="offcanvas offcanvas-start" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <Sidebar filter={filter} setFilter={setFilter} setCategoryId={setCategoryId} />
            </div>
            {error ? (
                <div className="text-center mt-6">
                    <p>{error}</p>
                </div>
            ) : (
                filterVideos[filter].videos.length ? (
                    <InfiniteScroll
                        dataLength={filterVideos[filter].videos.length}
                        next={fetchVideos}
                        hasMore={filterVideos[filter].videos.length < 500}
                        loader={<Spinner />}
                        height={650}
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
            )}
        </div>
    );
}

export default HomeVideos;