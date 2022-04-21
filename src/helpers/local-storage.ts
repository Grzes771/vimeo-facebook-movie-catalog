import { TVideosArrItem } from '../store/types/movie-item';

export const favVideo = 'favVideos';

export const setLocalStorage = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

export const getLocalStorage = (key: string) => {
  const localStorageItem = localStorage.getItem(key);
  const item = localStorageItem ? JSON.parse(localStorageItem) : null;
  return item;
};

export const addItemToLS = (movie: TVideosArrItem) => {
  const newItem = { ...movie, favorite: true };
  const getItems = localStorage.getItem(favVideo);
  let moviesArr = getItems ? JSON.parse(getItems) : [];
  moviesArr.push(newItem);
  setLocalStorage(favVideo, moviesArr);
};

export const removeItemFromLS = (movie: TVideosArrItem) => {
  const getItems = localStorage.getItem(favVideo);
  let moviesArr = getItems ? JSON.parse(getItems) : [];
  const newMoviesArr = moviesArr.filter(
    (basketItem: TVideosArrItem) => basketItem.path !== movie.path
  );
  setLocalStorage(favVideo, newMoviesArr);
};
