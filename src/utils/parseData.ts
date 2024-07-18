import { ChannelInfoType, CommentType, PlaylistItemType, PlaylistType, ReplyType } from './Types';

export const parseChannelInfo = (channelData: any): ChannelInfoType => {
    return {
        id: channelData.id,
        title: channelData.snippet.title,
        description: channelData.snippet.description,
        customUrl: channelData.snippet.customUrl || '',
        thumbnails: {
            default: { url: channelData.snippet.thumbnails.default.url },
            medium: { url: channelData.snippet.thumbnails.medium.url },
            high: { url: channelData.snippet.thumbnails.high.url },
        },
        subscriberCount: channelData.statistics.subscriberCount,
        videoCount: channelData.statistics.videoCount,
        // playListsCount: playListsCount
    };
};

export const parsePlaylists = (playlistsData: any[]): PlaylistType[] => {
    return playlistsData.map((playlist: any) => parseSinglePlaylist(playlist));

};

export const parseSinglePlaylist = (playlist: any): PlaylistType => {
    return {
        id: playlist.id,
        title: playlist.snippet.title,
        description: playlist.snippet.description,
        thumbnails: {
            default: { url: playlist.snippet.thumbnails.default.url },
            medium: { url: playlist.snippet.thumbnails.medium.url },
            high: { url: playlist.snippet.thumbnails.high.url },
        },
        videosCount: playlist.contentDetails.itemCount
    };
};

export const parsePlaylistitem = (playlistItems: any[]): PlaylistItemType[] => {
    return playlistItems.map((playlistItem: any) => ({
        id: playlistItem.contentDetails.videoId,
        title: playlistItem.snippet.title,
        description: playlistItem.snippet.description,
        channelId: playlistItem.snippet.channelId,
        thumbnails: {
            default: { url: playlistItem.snippet.thumbnails.default.url },
            medium: { url: playlistItem.snippet.thumbnails.medium.url },
            high: { url: playlistItem.snippet.thumbnails.high.url },
        },
    }))
};

export const parseComments = (comments: any[]): CommentType[] => {
    return comments.map((comment: any) => ({
        commentId: comment.id,
        authorChannelId: comment.snippet.topLevelComment.snippet.authorChannelId.value,
        authorName: comment.snippet.topLevelComment.snippet.authorDisplayName,
        authorProfile: comment.snippet.topLevelComment.snippet.authorProfileImageUrl,
        commentText: comment.snippet.topLevelComment.snippet.textOriginal,
        commentLikeCount: comment.snippet.topLevelComment.snippet.likeCount,
        commentRepliesCount: comment.snippet.totalReplyCount
    }))
};
export const parseReplies = (replies: any[]): ReplyType[] => {
    return replies.map((reply: any) => ({
        replyId: reply.id,
        authorChannelId: reply.snippet.authorChannelId.value,
        authorName: reply.snippet.authorDisplayName,
        authorProfile: reply.snippet.authorProfileImageUrl,
        replyText: reply.snippet.textOriginal,
        replyLikeCount: reply.snippet.likeCount
    }))
};


