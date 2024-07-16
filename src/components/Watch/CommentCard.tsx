import React, { useEffect, useState } from 'react'
import { BiLike } from "react-icons/bi";
import { CommentType, ReplyType } from '../../utils/Types'
import { fetchCommentReplies } from '../../utils/api';
import { parseReplies } from '../../utils/parseData';
import CommentBody from './CommentBody';

interface ReplyiesState {
    replies: ReplyType[],
    nextPageToken: null | string
};

function CommentCard({ comment }: { comment: CommentType }) {
    const [replies, setReplies] = useState<ReplyiesState>({ replies: [], nextPageToken: null })

    const getCommentReplies = async () => {
        const commentsResponse = await fetchCommentReplies(comment.commentId!, replies.nextPageToken!)
        const parsedReply = parseReplies(commentsResponse.items)

        setReplies(prev => ({
            replies: [...prev.replies, ...parsedReply],
            nextPageToken: commentsResponse.nextPageToken
        }))

    }

    useEffect(() => {
        if (comment && comment.commentRepliesCount > 0) {
            getCommentReplies()
        }
    }, [])

    return (
        <div className="flex flex-col gap-2">
            <CommentBody data={comment} />
            <div className="px-14">
                {comment.commentRepliesCount > 0 &&
                    replies.replies.map(reply => (
                        <CommentBody key={reply.replyId} data={reply} />
                    ))
                }
            </div>
        </div>)
}

export default CommentCard