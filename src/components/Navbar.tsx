import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { BsYoutube } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { searchListType } from '../utils/Types';

interface NavbarProps {
    search: string;
    setSearch: (search: string) => void;
    fetchSearchData: (query: string) => void;
    setSearchList: React.Dispatch<React.SetStateAction<searchListType>>;
}

function Navbar({ search, setSearch, fetchSearchData, setSearchList }: NavbarProps) {
    const navigate = useNavigate();

    const searchFunction = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (search.trim()) {
            setSearchList({ videos: [], nextPageToken: null });
            navigate(`/search?query=${search}`);
        } else {
            navigate('/');
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchFunction(e as any)
        }
    };

    return (
        <div className="w-full bg-[#0c0c0c] opacity-[98%] sticky top-0 z-50">
            <div className="flex md:gap-0 gap-2  justify-between items-center w-[95%] mx-auto h-14 ">
                <div className="flex sm:gap-8 gap-3 items-center text-2xl">
                    <a className="" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                        <RxHamburgerMenu className='sm:text-xl text-lg' />
                    </a>
                    <Link to="/">
                        <div className="flex gap-1 items-center justify-center">
                            <BsYoutube className="sm:text-3xl text-2xl text-red-600" />
                            <span className="sm:text-xl text-lg">YouTube</span>
                        </div>
                    </Link>
                </div>
                <div className="flex items-center justify-center gap-5">
                    <form onSubmit={searchFunction}>
                        <div className="flex items-center sm:h-10 h-9 border-[0.6px] border-neutral-700 rounded-full overflow-hidden">
                            <div className="flex md:gap-4 items-center md:pr-5 pr-2">
                                <input
                                    type="text"
                                    className="md:w-96 w-[100%] sm:px-3 px-2 sm:text-lg text-md text-zinc-400 bg-[#0c0c0c] focus:outline-none placeholder:text-neutral-500 "
                                    placeholder='Search'
                                    value={search}
                                    onChange={(e) => { setSearch(e.target.value) }}
                                    onKeyDown={handleKeyPress}
                                />

                                <AiOutlineClose
                                    className={`sm:text-lg text-md cursor-pointer text-neutral-400 ${!search ? "invisible" : "visible"}`}
                                    onClick={() => { setSearch('') }} />
                            </div>
                            <button className="h-10 w-16 flex items-center justify-center bg-neutral-900 border-l-[1px] border-neutral-700 ">
                                <CiSearch className="sm:text-2xl text-xl text-neutral-200" />
                            </button>
                        </div>
                    </form>

                </div>
                <div className="hidden lg:block">
                    {/* empty */}
                </div>
            </div>
        </div>
    )
}

export default Navbar