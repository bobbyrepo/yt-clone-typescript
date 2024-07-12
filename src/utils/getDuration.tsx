
export const getDuration = (duration: string) => {
    // Parsing ISO 8601 duration to human-readable format
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (parseInt(match[1]) || 0);
    const minutes = (parseInt(match[2]) || 0);
    const seconds = (parseInt(match[3]) || 0);
    return `${hours ? hours + ':' : ''}${minutes ? minutes + ':' : ''}${seconds ? seconds + '' : ''}`.trim();
};