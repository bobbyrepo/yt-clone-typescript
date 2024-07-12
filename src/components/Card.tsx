import React from "react";
import { Link } from "react-router-dom";
import { HomeVideoType } from "../utils/Types";

export default function Card({ data }: { data: HomeVideoType }) {
  return (
    <div className="col cursor-pointer hover:scale-[101%] duration-200 ease-in-out">
      <Link to={`/watch/${data.channelInfo.id}/${data.videoId}`} >
        <div className="flex gap-3 flex-col">
          <div className="relative overflow-hidden ">
            <img
              src={data.videoThumbnail}
              className="aspect-[16/9]  object-cover rounded-xl"
              alt="thumbnail"
            />
            <span className="absolute bottom-3 right-3 text-sm bg-[#0c0c0cd0] px-2 py-0.5 z-10 rounded">
              {data.videoDuration}
            </span>
          </div>

          <div className="flex gap-2 pb-3">
            <img
              src={data.channelInfo.image}
              alt="channel"
              className="h-10 object-cover aspect-[1/1] rounded-full"
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-lg line-clamp-2">{data.videoTitle}</h3>
              <div className="text-md text-gray-400">
                <h4>
                  {data.channelInfo.name}
                </h4>
                <div className="flex gap-1">
                  <span>{data.videoViews} views</span>
                  <span>•</span>
                  <span>{data.videoAge}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
