import React from 'react';
import { SingleMovie } from './components/single-video';
import { useSelector } from 'react-redux';
import BlockUi from 'react-block-ui';

import { setInputDataRX } from 'store/change-panel-values/selector';
import { addYoutubeVideoIsLoadingRX } from 'store/get-youtube-videos/selectors';
import { addVimeoVideoIsLoadingRX } from 'store/get-vimeo-videos/selectors';
import { FAV_VIDEOS, getLocalStorage } from 'helpers/local-storage';
import { TVideosArrItem } from 'store/types/movie-item';
import { useVideosListContext } from 'contexts/video-list-context';

import { ListPagination } from '../list-pagination/index';

import 'react-block-ui/style.css';
import { MovieContainer, Container } from './index.styles';

export const MovieList = () => {
  const { currentPage, videosList, displayType } = useVideosListContext();
  const pageSize = 12;

  const currentVideos = getLocalStorage(FAV_VIDEOS) ?? null;
  const showDisplayInputStoreValue = useSelector(setInputDataRX);

  const showInputValues = {
    orderBy: showDisplayInputStoreValue.orderBy,
    favorite: showDisplayInputStoreValue.favorite,
  };

  const displayFavoriteVideos =
    showInputValues.favorite === 'favorite'
      ? (videosList ?? [])
          ?.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
          .map((movie: TVideosArrItem) =>
            movie.favorite === true ? (
              <SingleMovie key={movie.path} movie={movie} />
            ) : null
          )
      : null;

  const displayAllMovies = () =>
    showInputValues.favorite === 'all'
      ? (videosList ?? [])
          .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
          .map((movie) => <SingleMovie key={movie.path} movie={movie} />)
      : displayFavoriteVideos;

  const addYoutubeVideoIsLoading = useSelector(addYoutubeVideoIsLoadingRX);
  const addVimeoVideoIsLoading = useSelector(addVimeoVideoIsLoadingRX);

  return (
    <BlockUi
      tag="div"
      blocking={addYoutubeVideoIsLoading || addVimeoVideoIsLoading}
    >
      <Container>
        <MovieContainer displayType={displayType}>
          {displayAllMovies()}
        </MovieContainer>
      </Container>
      {currentVideos < 13 ? null : (
        <ListPagination
          filterAndSort={videosList}
          filterAndSortFavorite={videosList}
        />
      )}
    </BlockUi>
  );
};
export default MovieList;
