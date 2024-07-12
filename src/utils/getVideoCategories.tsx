import axios from "axios";
import { BASE_URL } from "./constants";

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchCategories = async () => {
    try {
        const response = await axios.get(
            `${BASE_URL}/videoCategories?part=snippet&regionCode=us&key=${API_KEY}`
        );
        return response.data.items;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};