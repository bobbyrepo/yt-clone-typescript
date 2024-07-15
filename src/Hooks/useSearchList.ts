import { useState } from 'react';
import axios from 'axios';
import { searchListType } from '../utils/Types';
import { BASE_URL } from '../utils/constants';
import { getAllSearchVideosData } from '../utils/getAllSearchVideosData';
import { fetchSearch } from '../utils/api';

const API_KEY = import.meta.env.VITE_API_KEY;

export const useSearchList = () => {
    const [searchList, setSearchList] = useState<searchListType>({ videos: [], nextPageToken: null });

    const fetchSearchData = async (query: string) => {
        try {
            const searchData = searchList.nextPageToken
                ? await fetchSearch(query, searchList.nextPageToken)
                : await fetchSearch(query)

            const mappedVideos = await getAllSearchVideosData(searchData.items);

            setSearchList((prev) => ({
                videos: [...prev.videos, ...mappedVideos],
                nextPageToken: searchData.nextPageToken,
            }));
        } catch (error) {
            console.error('Error fetching search videos:', error);
        }
    };

    return { searchList, setSearchList, fetchSearchData };
};

