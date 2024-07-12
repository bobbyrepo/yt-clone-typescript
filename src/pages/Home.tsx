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
    // const [homeVideos, setHomeVideos] = useState<HomeVideosState>({
    //     videos: [],
    //     nextPageToken: null,
    // });
    const [filterVideos, setFilterVideos] = useState<Record<string, HomeVideosState>>({
        home: { videos: [], nextPageToken: null },
        trending: { videos: [], nextPageToken: null },
        music: { videos: [], nextPageToken: null },
        sport: { videos: [], nextPageToken: null },
        gaming: { videos: [], nextPageToken: null },
        films: { videos: [], nextPageToken: null },
    });

    const fetchVideos = async () => {
        try {
            const url =
                filter === 'home'
                    ? `${BASE_URL}/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=20&key=${API_KEY}&${filterVideos[filter].nextPageToken != null ? `pageToken=${filterVideos[filter].nextPageToken}` : ''
                    }`
                    : `${BASE_URL}/search?part=snippet,contentDetails,statistics&q=${filter}&maxResults=20&key=${API_KEY}&${filterVideos[filter].nextPageToken != null ? `pageToken=${filterVideos[filter].nextPageToken}` : ''
                    }`;
            const response = await axios.get(url);
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
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);
    useEffect(() => {
        console.log(filter);
    }, [filter]);

    return (
        <div>
            <div className="offcanvas offcanvas-start" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <Sidebar setFilter={setFilter} />
            </div>
            {filterVideos[filter].videos.length ? (
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
            )}
        </div>
    );
}

export default HomeVideos;
