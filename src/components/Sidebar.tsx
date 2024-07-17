import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdHomeFilled,
  MdOutlineSportsVolleyball,
} from "react-icons/md";
import { TbMusic, TbDeviceGamepad2 } from "react-icons/tb";
import { BiMoviePlay } from "react-icons/bi";
import { FaRegNewspaper } from "react-icons/fa";
import { TbHanger } from "react-icons/tb";
import { MdOutlineLightbulb } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsYoutube } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { mainLinks, textLinks } from "../utils/constants";
import { fetchCategories } from "../utils/getVideoCategories";

export default function Sidebar({ filter, setFilter, setCategoryId }:
  {
    filter: string;
    setFilter: (filter: string) => void;
    setCategoryId: (filter: string | null) => void
  }) {

  const navigate = useNavigate()
  const [categories, setCategories] = useState<any[]>([])

  const fetchAndSetCategories = async () => {
    const res = await fetchCategories();
    setCategories(res)
  };

  useEffect(() => {
    fetchAndSetCategories();
  }, []);


  let categoriesLinks = [
    {
      icon: <TbMusic className="text-xl" />,
      name: "Music",
      filterTag: "music",
      categoryId: categories.find((item: { snippet: { title: string } }) => item.snippet.title === "Music")?.id
    },
    {
      icon: <MdOutlineSportsVolleyball className="text-xl" />,
      name: "Sport",
      filterTag: "sport",
      categoryId: categories.find((item: { snippet: { title: string } }) => item.snippet.title === "Sports")?.id
    },
    {
      icon: <TbDeviceGamepad2 className="text-xl" />,
      name: "Gaming",
      filterTag: "gaming",
      categoryId: categories.find((item: { snippet: { title: string } }) => item.snippet.title === "Gaming")?.id
    },
    {
      icon: <BiMoviePlay className="text-xl" />,
      name: "Movies",
      filterTag: "movies",
      categoryId: categories.find((item: { snippet: { title: string } }) => item.snippet.title === "Movies")?.id
    },
    {
      icon: <FaRegNewspaper className="text-xl" />,
      name: "News",
      filterTag: "news",
      categoryId: categories.find((item: { snippet: { title: string } }) => item.snippet.title === "News & Politics")?.id
    },
    {
      icon: <TbHanger className="text-xl" />,
      name: "Fashion",
      filterTag: "fashion",
      categoryId: categories.find((item: { snippet: { title: string } }) => item.snippet.title === "Howto & Style")?.id
    },
    {
      icon: <MdOutlineLightbulb className="text-xl" />,
      name: "Course",
      filterTag: "course",
      categoryId: categories.find((item: { snippet: { title: string } }) => item.snippet.title === "Education")?.id
    },
  ];


  const toggleFilter = (filter: string, categoryId: string | null) => {
    setFilter(filter);
    setCategoryId(categoryId)
    navigate("/")
  }

  return (
    <div data-bs-dismiss="offcanvas" className="w-full h-full text-white bg-[#0c0c0c] overflow-auto pb-8 sidebar">
      <div className="flex sm:gap-8 gap-3 items-center text-2xl w-[85%] mx-auto sm:h-14 h-12">
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
      <ul className="flex flex-col border-b-[1px] border-zinc-700">
        {mainLinks.map(({ icon, name, filterTag, categoryId }) => {
          return (
            <li
              key={name}
              className={`pl-6 py-3 hover:bg-neutral-800 ${filter === filterTag ? "bg-neutral-800" : ""}`}
              onClick={() => toggleFilter(filterTag, categoryId)}
            >
              <h1 className="flex items-center gap-sm-5 gap-4">
                {icon}
                <span className="text-sm tracking-wider">{name}</span>
              </h1>
            </li>
          );
        })}
      </ul>
      <ul className="flex flex-col border-b-[1px] border-zinc-700">
        {categoriesLinks.map(({ icon, name, filterTag, categoryId }) => {
          return (
            <li key={name}
              className={`pl-6 py-3 hover:bg-neutral-800 ${filter === filterTag ? "bg-neutral-800" : ""}`}
              onClick={() => { toggleFilter(filterTag, categoryId) }}
            >
              <h1 className="flex items-center gap-sm-5 gap-4">
                {icon}
                <span className="text-sm tracking-wider">{name}</span>
              </h1>
            </li>
          );
        })}
      </ul>
      <ul className="flex gap-2 flex-wrap text-sm p-sm-4 p-2 text-zinc-400">
        {textLinks[0].map((name) => {
          return <li key={name}>{name}</li>;
        })}
      </ul>
      <ul className="flex gap-2 flex-wrap text-sm p-sm-4 p-2 text-zinc-400">
        {textLinks[1].map((name) => {
          return <li key={name}>{name}</li>;
        })}
      </ul>
      <span className="px-sm-4 px-2 text-sm text-zinc-400">&copy; 2022 Google</span>
      <br />
      <p className="px-sm-4 px-2 pt-3 text-sm text-zinc-400">
        This clone is for educational purpose only.
      </p>
    </div >
  );
}
