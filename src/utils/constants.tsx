import {
    MdHomeFilled,
    MdOutlineSportsVolleyball,
} from "react-icons/md";
import { TbMusic, TbDeviceGamepad2 } from "react-icons/tb";
import { FaRegCompass } from "react-icons/fa";
import { GiFilmStrip } from "react-icons/gi";

export const BASE_URL = "https://youtube.googleapis.com/youtube/v3";

export const mainLinks = [
    {
        icon: <MdHomeFilled className="text-xl" />,
        name: "Home",
        filter: "home"
    },
    {
        icon: <FaRegCompass className="text-xl" />,
        name: "Explore",
        filter: "trending"
    },
];

export const categoriesLinks = [
    {
        icon: <TbMusic className="text-xl" />,
        name: "Music",
        filter: "music"
    },
    {
        icon: <MdOutlineSportsVolleyball className="text-xl" />,
        name: "Sport",
        filter: "sport"
    },
    {
        icon: <TbDeviceGamepad2 className="text-xl" />,
        name: "Gaming",
        filter: "gaming"
    },
    {
        icon: <GiFilmStrip className="text-xl" />,
        name: "Films",
        filter: "films"
    },
];

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