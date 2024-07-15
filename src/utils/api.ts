import axios from 'axios';
import { BASE_URL } from './constants';

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchPopularVideos = async (categoryId: string | null, filter: string, pageToken: string | null, setError?: (s: string) => void) => {
    const url = `${BASE_URL}/videos?part=snippet&chart=mostPopular&maxResults=20&key=${API_KEY}&${categoryId != null ? `videoCategoryId=${categoryId}` : ''}&${pageToken != null ? `pageToken=${pageToken}` : ''}&${filter == "news" ? "regionCode=in" : ""}`
    const response = await axios.get(url);
    if (setError) {
        if (response.data.error) {
            setError('Videos not available for this filter.');
            return;
        }
        setError("")
    }
    return response.data
}

export const fetchVideosData = async (videoId: string) => {
    const url = `${BASE_URL}/videos?part=snippet&id=${videoId}&maxResults=20&key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data.items;
}

export const fetchSearch = async (query: string, pageToken?: string) => {
    const url = `${BASE_URL}/search?part=snippet&q=${query}&maxResults=20&key=${API_KEY}&${pageToken != null ? `pageToken=${pageToken}` : ''}`;
    const response = await axios.get(url);
    return response.data;
}

export const fetchChannelVideos = async (channelId?: string, pageToken?: string) => {
    const url = `${BASE_URL}/activities?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&${pageToken != null ? `pageToken=${pageToken}` : ''}`
    const response = await axios.get(url);
    return response.data
}

export const fetchChannelInfo = async (channelId: string) => {
    const url = `${BASE_URL}/channels?key=${API_KEY}&id=${channelId}&part=snippet,contentDetails,statistics`;
    const response = await axios.get(url);
    return response.data.items[0];
};

export const fetchPlaylists = async (channelId: string, pageToken?: string) => {
    const url = `${BASE_URL}/playlists?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=15${pageToken ? `&pageToken=${pageToken}` : ''}`;
    const response = await axios.get(url);
    return response.data;
};