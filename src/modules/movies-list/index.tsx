import React, { useEffect } from 'react';
import { SingleMovie } from './components/single-video';
import { useSelector } from 'react-redux';
import BlockUi from 'react-block-ui';

import { addYoutubeVideoIsLoadingRX } from 'store/get-youtube-videos/selectors';
import { addVimeoVideoIsLoadingRX } from 'store/get-vimeo-videos/selectors';
import { TVideosArrItem } from 'store/types/movie-item';
import { useVideosListContext } from 'contexts/video-list-context';

import { ListPagination } from './components/list-pagination';

import 'react-block-ui/style.css';
import { MovieContainer, Container } from './index.styles';

export const MovieList = () => {
  const { videosList, videosTotalCount, displayType } = useVideosListContext();

  const addYoutubeVideoIsLoading = useSelector(addYoutubeVideoIsLoadingRX);
  const addVimeoVideoIsLoading = useSelector(addVimeoVideoIsLoadingRX);

  const displayAllMovies = (videosList: TVideosArrItem[]) =>
    videosList.map((movie) => <SingleMovie key={movie.path} movie={movie} />);

  return (
    <BlockUi
      tag="div"
      blocking={addYoutubeVideoIsLoading || addVimeoVideoIsLoading}
    >
      <Container>
        <MovieContainer displayType={displayType}>
          {displayAllMovies(videosList)}
        </MovieContainer>
      </Container>
      {videosTotalCount > 12 && <ListPagination />}
    </BlockUi>
  );
};

export default MovieList;
