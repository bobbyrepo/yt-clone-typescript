import {
    MdHomeFilled,
    MdOutlineSportsVolleyball,
} from "react-icons/md";
import { TbMusic, TbDeviceGamepad2 } from "react-icons/tb";
import { BiMoviePlay } from "react-icons/bi";
import { FaRegNewspaper } from "react-icons/fa";
import { TbHanger } from "react-icons/tb";
import { MdOutlineLightbulb } from "react-icons/md";

export const BASE_URL = "https://youtube.googleapis.com/youtube/v3";

export const mainLinks = [
    {
        icon: <MdHomeFilled className="text-xl" />,
        name: "Home",
        filterTag: "home",
        categoryId: null
    },
];
export let categoriesLinks: any[] = [];

export const updateCategoriesLinks = (categories: any[]) => {
    categoriesLinks = [
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
};

export const getCategoriesLinks = () => categoriesLinks;

export const textLinks = [
    [
        "About",
        "Press",
        "Copyright",
        "Contact us",
        "Creator",
        "Advertise",
        "Developers",
    ],
    [
        "Terms",
        "Privacy",
        "Policy & Safety",
        "How YouTube works",
        "Test new features",
    ],
];