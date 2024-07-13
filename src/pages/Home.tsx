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

const API_KEY = import.meta.env.VITE_API_KEY;

interface HomePageProps {
    filter: string;
    categoryId: string | null;
    searchlist: SearchListState
}

interface SearchListState {
    videos: HomeVideoType[],
    nextPageToken: null | string
};


interface HomeVideosState {
    videos: HomeVideoType[],
    nextPageToken: null | string
};

function HomeVideos({ filter, categoryId, searchlist }: HomePageProps) {

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
            const url = `${BASE_URL}/videos?part=snippet&chart=mostPopular&maxResults=20&key=${API_KEY}&${categoryId != null ? `videoCategoryId=${categoryId}` : ''}&${filterVideos[filter].nextPageToken != null ? `pageToken=${filterVideos[filter].nextPageToken}` : ''}&${filter == "news" ? "regionCode=in" : ""}`

            const response = await axios.get(url);
            if (response.data.error) {
                setError('Videos not available for this filter.');
                return;
            }
            setError("")
            console.log("Home Video", response.data.items[0]);

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
    }, [filter]);


    return (
        <div>
            {error ? (
                <div className="text-center mt-6">
                    <p>{error}</p>
                </div>
            ) : (
                <div>
                    {!searchlist.videos.length ? (
                        filterVideos[filter].videos.length ? (
                            <InfiniteScroll
                                dataLength={filterVideos[filter].videos.length}
                                next={fetchVideos}
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
                    ) : (
                        searchlist.videos.length ? (
                            <InfiniteScroll
                                dataLength={searchlist.videos.length}
                                // next={fetchSearch}
                                hasMore={searchlist.videos.length < 500}
                                loader={<Spinner />}
                                height={680}
                            >
                                <div className="row row-cols-3 w-[95%] mx-auto mt-6">
                                    {searchlist.videos.length > 0 &&
                                        searchlist.videos.map((item: HomeVideoType) => <Card data={item} key={item.videoId} />)}
                                </div>
                            </InfiniteScroll>
                        ) : (<Spinner />)
                    )
                    }
                </div>
            )}
        </div>
    );
}

export default HomeVideos;