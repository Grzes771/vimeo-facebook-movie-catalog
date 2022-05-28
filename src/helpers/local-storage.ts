import { TVideosArrItem } from '../store/types/movie-item';

export const FAV_VIDEOS = 'favVideos';

export const setLocalStorage = (key: string, value: Array<TVideosArrItem>) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorage = (key: string) => {
  const localStorageItem = localStorage.getItem(key);
  const item = localStorageItem ? JSON.parse(localStorageItem) : null;
  return item;
};

export const addItemToLS = (movie: TVideosArrItem) => {
  const getItems = localStorage.getItem(FAV_VIDEOS);

  if (!getItems) {
    const newArr = [movie];
    setLocalStorage(FAV_VIDEOS, newArr);
    return;
  }
  const moviesArr = JSON.parse(getItems);
  moviesArr.push(movie);
  setLocalStorage(FAV_VIDEOS, moviesArr);
};

export const removeItemFromLS = (movie: TVideosArrItem) => {
  const getItems = localStorage.getItem(FAV_VIDEOS);
  let moviesArr = getItems ? JSON.parse(getItems) : [];
  const newMoviesArr = moviesArr.filter(
    (basketItem: TVideosArrItem) => basketItem.path !== movie.path
  );
  setLocalStorage(FAV_VIDEOS, newMoviesArr);
};

export const deleteItemFromLS = (key: string) => {
  localStorage.removeItem(key);
};
