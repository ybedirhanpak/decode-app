export function formatDate(date: string) {
    const now = new Date();
    const versionDate = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - versionDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return "now";
    } else if (diffInSeconds < 3600) {
        return `${Math.floor(diffInSeconds / 60)}m ago`;
    } else if (diffInSeconds < 86400) {
        return `${Math.floor(diffInSeconds / 3600)}h ago`;
    } else if (diffInSeconds < 604800) {
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    } else if (diffInSeconds < 2592000) {
        return `${Math.floor(diffInSeconds / 604800)}w ago`;
    } else {
        return `${Math.floor(diffInSeconds / 2592000)}m ago`;
    }
}
