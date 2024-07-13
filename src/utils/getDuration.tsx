
export const getDuration = (duration: string) => {
    // Parsing ISO 8601 duration to human-readable format
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    if (!match) {
        return '0:00'; // Return a default value if the format is not recognized
    }

    const hours = (match[1] ? parseInt(match[1]) : 0);
    const minutes = (match[2] ? parseInt(match[2]) : 0);
    const seconds = (match[3] ? parseInt(match[3]) : 0);

    // Format hours, minutes, and seconds with leading zeros if necessary
    const formattedHours = hours ? `${hours}` : '';
    const formattedMinutes = minutes < 10 && hours ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${formattedHours}${formattedHours ? ':' : ''}${formattedMinutes}:${formattedSeconds}`;
};