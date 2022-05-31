import { useNavigate } from 'react-router-dom';
import { TVideosArrItem } from 'store/types/movie-item';
import { useVideosListContext } from 'contexts/video-list-context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faStar,
  faTrashAlt,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';

import { getVideoIdFromUrl } from 'modules/search-form/helpers';

import {
  EFavoriteVideosActions,
  EVideosPlatform,
} from 'types/video-list-context-enums';

import { VIMEO_YOUTUBE_MOVIE_CATALOG } from 'App';
import * as S from './index.styles';
import './icons-styles.css';

type TSingleMovie = {
  movie: TVideosArrItem;
};

export const SingleMovie = ({ movie }: TSingleMovie) => {
  const {
    displayType,
    setSingleVideo,
    addOrRemoveVideoFromFavorite,
    deleteSingleVideo,
  } = useVideosListContext();

  const navigate = useNavigate();

  const DELETE_ITEM_MODAL_MESSAGE = 'Czy na pewno chcesz usunąć ten film?';

  const handleDeleteSingleMovie = () => {
    if (window.confirm(DELETE_ITEM_MODAL_MESSAGE))
      deleteSingleVideo(movie.path);
  };

  const handleOnClick = () => {
    setSingleVideo(movie);

    const movieId =
      movie.platform === EVideosPlatform.VIMEO
        ? getVideoIdFromUrl(movie.path)
        : movie.path;

    console.log({ movieId });

    navigate(`/${VIMEO_YOUTUBE_MOVIE_CATALOG}/${movieId}`);
  };

  return (
    <S.SingleCardStyle displayType={displayType} data-testid="card">
      <S.CardImageWrapper displayType={displayType} onClick={handleOnClick}>
        <img src={movie.thumbNails} alt="thumbnail" />
      </S.CardImageWrapper>
      <S.ContentWrapper displayType={displayType}>
        <S.CardHeaderStyle displayType={displayType}>
          <p>{movie.title}</p>
        </S.CardHeaderStyle>
        <S.CardFooterStyle displayType={displayType}>
          <div>
            {movie.viewsCount && (
              <span>
                <FontAwesomeIcon icon={faEye} />
                {` ${movie.viewsCount}`}
              </span>
            )}
            {movie.likes && (
              <span>
                <FontAwesomeIcon icon={faThumbsUp} />
                {` ${movie.likes}`}
              </span>
            )}
          </div>
          <div>
            <span>
              <FontAwesomeIcon
                icon={faStar}
                className={`${movie.favorite === true ? 'active-star' : ''}`}
                onClick={() =>
                  addOrRemoveVideoFromFavorite(
                    movie.path,
                    movie?.favorite
                      ? EFavoriteVideosActions.REMOVE
                      : EFavoriteVideosActions.ADD
                  )
                }
              />
            </span>
            <span>
              <FontAwesomeIcon
                data-testid="remove-icon"
                icon={faTrashAlt}
                onClick={handleDeleteSingleMovie}
              />
            </span>
          </div>
        </S.CardFooterStyle>
      </S.ContentWrapper>
    </S.SingleCardStyle>
  );
};
