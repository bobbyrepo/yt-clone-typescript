// src/hooks/useSearchList.ts
import { useState } from 'react';
import axios from 'axios';
import { searchListType } from '../utils/Types';
import { BASE_URL } from '../utils/constants';
import { getAllSearchVideosData } from '../utils/getAllSearchVideosData';

const API_KEY = import.meta.env.VITE_API_KEY;

export const useSearchList = () => {
    const [searchList, setSearchList] = useState<searchListType>({ videos: [], nextPageToken: null });

    const fetchSearch = async (query: string) => {
        try {
            const url = `${BASE_URL}/search?part=snippet&q=${query}&maxResults=20&key=${API_KEY}&${searchList.nextPageToken != null ? `pageToken=${searchList.nextPageToken}` : ''
                }`;

            const response = await axios.get(url);
            const mappedVideos = await getAllSearchVideosData(response.data.items);
            setSearchList((prev) => ({
                videos: [...prev.videos, ...mappedVideos],
                nextPageToken: response.data.nextPageToken,
            }));
        } catch (error) {
            console.error('Error fetching search videos:', error);
        }
    };

    return { searchList, fetchSearch, setSearchList };
};

