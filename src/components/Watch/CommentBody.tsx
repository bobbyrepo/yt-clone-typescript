import React from 'react'
import { BiLike } from "react-icons/bi";
import { CommentType, ReplyType } from '../../utils/Types';


interface CommentBodyProps {
    data: CommentType | ReplyType;
}

const isCommentType = (data: CommentType | ReplyType): data is CommentType => {
    return (data as CommentType).commentText !== undefined;
};

function CommentBody({ data }: CommentBodyProps) {
    return (
        <div className="flex gap-3">
            <img src={data.authorProfile}
                className={`h-fit rounded-full ${isCommentType(data) ? `w-10 ` : `w-8 `}`}
                alt="channelImg"
            />
            <div className="">
                <h1 className='text-md'>{data.authorName}</h1>
                <h2 className="text-neutral-300 whitespace-pre-line">
                    {isCommentType(data) ? data.commentText : data.replyText}
                </h2>
                <div className="flex items-center text-neutral-400 w-fit gap-1 cursor-pointer">
                    <BiLike className="" />
                    <p>{isCommentType(data) ? data.commentLikeCount : data.replyLikeCount}</p>
                </div>
            </div>
        </div>)
}

export default CommentBody