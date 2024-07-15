import axios from 'axios';
import { BASE_URL } from './constants';

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchChannelInfo = async (channelId: string) => {
    const url = `${BASE_URL}/channels?key=${API_KEY}&id=${channelId}&part=snippet,contentDetails,statistics`;
    const response = await axios.get(url);
    console.log("fetchChannelInfo", response)
    return response.data.items[0];
};

export const fetchPlaylists = async (channelId: string, pageToken?: string) => {
    const url = `${BASE_URL}/playlists?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=15${pageToken ? `&pageToken=${pageToken}` : ''}`;
    const response = await axios.get(url);
    return response.data;
};