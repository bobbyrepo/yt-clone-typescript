import { useState } from 'react';
import { searchListType } from '../utils/Types';
import { getAllSearchVideosData } from '../utils/getAllSearchVideosData';
import { fetchSearch } from '../utils/api';

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

