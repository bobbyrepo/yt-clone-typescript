import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { TiMicrophone } from "react-icons/ti";
import { BsYoutube, BsCameraVideo, BsBell } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoAppsSharp } from "react-icons/io5";
import Sidebar from './Sidebar';

function Navbar() {
    const [search, setSearch] = useState("")

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
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            // handleSearch();
                        }}
                    >
                        <div className="flex items-center h-10 border-[0.6px] border-neutral-700 rounded-full overflow-hidden">
                            <div className="flex gap-4 items-center pr-5">
                                <div>
                                    {/* <CiSearch className="text-xl" /> */}
                                </div>
                                <input
                                    type="text"
                                    className="w-96 text-lg text-zinc-400 bg-[#0c0c0c] focus:outline-none placeholder:text-neutral-500 "
                                    placeholder='Search'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />

                                <AiOutlineClose
                                    className={`text-xl cursor-pointer text-neutral-400 ${!search ? "invisible" : "visible"}`}
                                    onClick={() => setSearch("")}
                                />
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