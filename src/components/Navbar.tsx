import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { TiMicrophone } from "react-icons/ti";
import { BsYoutube, BsCameraVideo, BsBell } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoAppsSharp } from "react-icons/io5";
import Sidebar from './Sidebar';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { HomeVideoType } from '../utils/Types'
import { getAllSearchVideosData } from '../utils/getAllSearchVideosData';

const API_KEY = import.meta.env.VITE_API_KEY;

interface SearchListState {
    videos: HomeVideoType[],
    nextPageToken: null | string
};

interface NavbarProp {
    searchlist: SearchListState
    setSearchList: React.Dispatch<React.SetStateAction<SearchListState>>;
}


function Navbar({ searchlist, setSearchList }: NavbarProp) {

    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("")

    const fetchSearch = async () => {
        try {
            const url = `${BASE_URL}/search?part=snippet&q=${search}&maxResults=20&key=${API_KEY}&${searchlist.nextPageToken != null ? `pageToken=${searchlist.nextPageToken}` : ''}`

            const response = await axios.get(url);
            if (response.data.error) {
                setError('Videos not available for this filter.');
                return;
            }
            setError("")

            const mappedVideos = await getAllSearchVideosData(response.data.items);
            setSearchList(prev => ({
                videos: [...prev.videos, ...mappedVideos],
                nextPageToken: response.data.nextPageToken,
            }));
        } catch (error) {
            console.error(`Error fetching search videos:`, error);
            setError('Error fetching videos. Please try again later.');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            setSearchList({ videos: [], nextPageToken: null })
            if (search.length > 0) {
                fetchSearch()
                // console.log("search for", search)
            }
            // console.log("search for", search)
        }
    }

    return (
        <div className="w-full bg-[#0c0c0c] opacity-[98%] sticky top-0 z-50">
            <div className="flex justify-between items-center w-[95%] mx-auto h-14 ">
                <div className="flex gap-8 items-center text-2xl">
                    <a className="" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                        <RxHamburgerMenu className='text-xl' />
                    </a>
                    <Link to="/">
                        <div className="flex gap-1 justify-center">
                            <BsYoutube className="text-3xl text-red-600" />
                            <span className="text-xl">YouTube</span>
                        </div>
                    </Link>
                </div>
                <div className="flex items-center justify-center gap-5">
                    <form>
                        <div className="flex items-center h-10 border-[0.6px] border-neutral-700 rounded-full overflow-hidden">
                            <div className="flex gap-4 items-center pr-5">
                                <input
                                    type="text"
                                    className="w-96 px-3 text-lg text-zinc-400 bg-[#0c0c0c] focus:outline-none placeholder:text-neutral-500 "
                                    placeholder='Search'
                                    value={search}
                                    onChange={(e) => { setSearch(e.target.value) }}
                                    onKeyDown={handleKeyPress}
                                />

                                <AiOutlineClose
                                    className={`text-xl cursor-pointer text-neutral-400 ${!search ? "invisible" : "visible"}`}
                                    onClick={() => { setSearch('') }} />
                            </div>
                            <button className="h-10 w-16 flex items-center justify-center bg-neutral-900 border-l-[1px] border-neutral-700 ">
                                <CiSearch className="text-2xl text-neutral-200" />
                            </button>
                        </div>
                    </form>

                </div>
                <div className="">
                    {/* empty */}
                </div>
            </div>
        </div>
    )
}

export default Navbar