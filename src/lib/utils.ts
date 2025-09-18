import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(dateString: string): string {
  const pastDate = new Date(dateString);
  const now = new Date();

  const diffInSeconds = Math.round((now.getTime() - pastDate.getTime()) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;
  const secondsInMonth = secondsInDay * 30;
  const secondsInYear = secondsInDay * 365;

  if (diffInSeconds < 10) {
    return "just now";
  } else if (diffInSeconds < secondsInMinute) {
    return `${diffInSeconds} seconds ago`;
  }

  const minutes = Math.floor(diffInSeconds / secondsInMinute);
  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(diffInSeconds / secondsInHour);
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(diffInSeconds / secondsInDay);
  if (days < 30) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  const months = Math.floor(diffInSeconds / secondsInMonth);
  if (months < 12) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }

  const years = Math.floor(diffInSeconds / secondsInYear);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

export const checkedIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};
