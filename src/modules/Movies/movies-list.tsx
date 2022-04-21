import React, { useState } from 'react';
import { SingleMovie } from './single-video';
import { useSelector } from 'react-redux';

import { setInputDataRX } from '../../store/changePanelValues/selector';
import { youtubeVideosDataRX } from '../../store/getYoutubeVideos/selectors';
import { vimeoVideosDataRX } from '../../store/getVimeoVideos/selectors';
import { favVideo, getLocalStorage } from '../../helpers/local-storage';
import { TVideosArrItem } from '../../store/types/movie-item';
import { Nav } from '../Nav/Nav';

import './style.css';

export const MovieList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const YoutubeVideos = useSelector(youtubeVideosDataRX);
  const showStoredVimeoMovie = useSelector(vimeoVideosDataRX);
  const currentVideos = [...showStoredVimeoMovie, ...YoutubeVideos];

  const showDisplayInputStoreValue = useSelector(setInputDataRX);

  const showInputValues = {
    orderBy: showDisplayInputStoreValue.orderBy,
    favorite: showDisplayInputStoreValue.favorite,
  };
  const favVideos: TVideosArrItem[] | null = getLocalStorage(favVideo);

  const FilterAndSort =
    showInputValues.orderBy === 'oldest'
      ? currentVideos.sort((a, b) => a.date - b.date)
      : currentVideos.sort((a, b) => b.date - a.date);

  const FilterAndSortFavorite =
    showInputValues.orderBy === 'oldest'
      ? favVideos?.sort((a, b) => a.date - b.date)
      : favVideos?.sort((a, b) => b.date - a.date);

  const DisplayYoutubeMovies =
    showInputValues.favorite === 'all'
      ? FilterAndSort.slice(currentPage * 4, (currentPage + 1) * 4).map(
          (movie) => <SingleMovie movie={movie} />
        )
      : showInputValues.favorite === 'favorite'
      ? FilterAndSortFavorite?.slice(
          currentPage * 4,
          (currentPage + 1) * 4
        ).map((movie: TVideosArrItem) => <SingleMovie movie={movie} />)
      : null;

  return (
    <div>
      <div className="movies-container">{DisplayYoutubeMovies}</div>
      <Nav
        filterAndSort={FilterAndSort}
        filterAndSortFavorite={FilterAndSortFavorite}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};
export default MovieList;
