import React, { useEffect, useState } from 'react'
import { CommentType } from '../../utils/Types'
import { fetchVideoComments } from '../../utils/api'
import { parseComments } from '../../utils/parseData'
import CommentCard from './CommentCard';

interface CommentState {
    comment: CommentType[],
    nextPageToken: null | string
};

function CommentList({ videoId }: { videoId?: string }) {
    const [commentList, setCommentList] = useState<CommentState>({ comment: [], nextPageToken: null })

    const getVideoComments = async () => {
        const commentsResponse = await fetchVideoComments(videoId, commentList.nextPageToken!)
        const parsedComments = parseComments(commentsResponse.items)

        setCommentList(prev => ({
            comment: [...prev.comment, ...parsedComments],
            nextPageToken: commentsResponse.nextPageToken
        }))

    }

    useEffect(() => {
        getVideoComments()
    }, [])

    return (
        <div className='mt-3 flex flex-col gap-2'>
            <h1 className='px-8 text-2xl font-semibold'>Comments</h1>
            <div className='flex flex-col gap-8'>
                {commentList?.comment?.length > 0 &&
                    commentList.comment.map(comment => (
                        <CommentCard key={comment.commentId} comment={comment} />
                    ))
                }
            </div>
            <button className='text-gray-400 hover:underline'
                onClick={getVideoComments}
            >Show more ...</button>
        </div>
    )
}

export default CommentList