import React, { Dispatch, SetStateAction } from 'react';
import { SingleMovie } from './single-video';
import { useSelector } from 'react-redux';
import BlockUi from 'react-block-ui';
import { setInputDataRX } from '../../store/change-panel-values/selector';
import {
  youtubeVideoIsLoadingRX,
  youtubeVideosDataRX,
} from '../../store/get-youtube-videos/selectors';
import {
  vimeoVideoIsLoadingRX,
  vimeoVideosDataRX,
} from '../../store/get-vimeo-videos/selectors';
import { favVideo, getLocalStorage } from '../../helpers/local-storage';
import { TVideosArrItem } from '../../store/types/movie-item';

import './style.css';
import 'react-block-ui/style.css';
import { Nav } from '../nav/index';

type TProps = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};
export const MovieList = (props: TProps) => {
  const { currentPage, setCurrentPage } = props;
  const pageSize = 4;

  const YoutubeVideos = useSelector(youtubeVideosDataRX);
  const showStoredVimeoMovie = useSelector(vimeoVideosDataRX);
  const currentVideos = [...showStoredVimeoMovie, ...YoutubeVideos];

  const showDisplayInputStoreValue = useSelector(setInputDataRX);

  const showInputValues = {
    orderBy: showDisplayInputStoreValue.orderBy,
    favorite: showDisplayInputStoreValue.favorite,
  };
  const favVideos: TVideosArrItem[] | null = getLocalStorage(favVideo);

  const sortMovies = (moviesArr: TVideosArrItem[]): TVideosArrItem[] =>
    showInputValues.orderBy === 'oldest'
      ? moviesArr?.sort((a, b) => a.date - b.date)
      : moviesArr?.sort((a, b) => b.date - a.date);

  const displayFavoriteVideos =
    showInputValues.favorite === 'favorite'
      ? sortMovies(favVideos ?? [])
          ?.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
          .map((movie: TVideosArrItem) => <SingleMovie movie={movie} />)
      : null;

  const displayYoutubeMovies =
    showInputValues.favorite === 'all'
      ? sortMovies(currentVideos)
          .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
          .map((movie) => <SingleMovie movie={movie} />)
      : displayFavoriteVideos;

  const isYoutubeLoading = useSelector(youtubeVideoIsLoadingRX);
  const isVimeoLoading = useSelector(vimeoVideoIsLoadingRX);
  return (
    <div>
      <BlockUi tag="div" blocking={isYoutubeLoading || isVimeoLoading}>
        <div className="movies-container">{displayYoutubeMovies}</div>
        <Nav
          filterAndSort={sortMovies(currentVideos)}
          filterAndSortFavorite={sortMovies(favVideos ?? [])}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </BlockUi>
    </div>
  );
};
export default MovieList;
