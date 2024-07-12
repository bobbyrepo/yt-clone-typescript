import React from "react";
import { Link } from "react-router-dom";
import { BsYoutube } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { mainLinks, categoriesLinks, textLinks } from "../utils/constants";

export default function Sidebar({ filter, setFilter, setCategoryId }:
  {
    filter: string;
    setFilter: (filter: string) => void;
    setCategoryId: (filter: string | null) => void
  }) {

  const toggleFilter = (filter: string, categoryId: string | null) => {
    setFilter(filter);
    setCategoryId(categoryId)
  }

  return (
    <div data-bs-dismiss="offcanvas" className="w-full h-full text-white bg-[#0c0c0c] overflow-auto pb-8 sidebar">
      <div className="flex gap-8 items-center text-2xl w-[80%] mx-auto h-14">
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
      <ul className="flex flex-col border-b-[1px] border-zinc-700">
        {mainLinks.map(({ icon, name, filterTag, categoryId }) => {
          return (
            <li
              key={name}
              className={`pl-6 py-3 hover:bg-neutral-800 ${filter === filterTag ? "bg-neutral-800" : ""}`}
              onClick={() => toggleFilter(filterTag, categoryId)}
            >
              <h1 className="flex items-center gap-5">
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
              <h1 className="flex items-center gap-5">
                {icon}
                <span className="text-sm tracking-wider">{name}</span>
              </h1>
            </li>
          );
        })}
      </ul>
      <ul className="flex gap-2 flex-wrap text-sm p-4 text-zinc-400">
        {textLinks[0].map((name) => {
          return <li key={name}>{name}</li>;
        })}
      </ul>
      <ul className="flex gap-2 flex-wrap text-sm p-4 text-zinc-400">
        {textLinks[1].map((name) => {
          return <li key={name}>{name}</li>;
        })}
      </ul>
      <span className="px-4 text-sm text-zinc-400">&copy; 2022 Google</span>
      <br />
      <p className="px-4 pt-3 text-sm text-zinc-400">
        This clone is for educational purpose only.
      </p>
    </div >
  );
}
