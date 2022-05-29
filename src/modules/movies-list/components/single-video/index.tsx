import { TVideosArrItem } from 'store/types/movie-item';
import { useVideosListContext } from 'contexts/video-list-context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faStar,
  faTrashAlt,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';

import { EFavoriteVideosActions } from 'types/video-list-context-enums';

import * as S from './index.styles';
import './icons-styles.css';

type TSingleMovie = {
  movie: TVideosArrItem;
};

export const SingleMovie = ({ movie }: TSingleMovie) => {
  const {
    displayType,
    setModalIsActive,
    setSingleVideo,
    addOrRemoveVideoFromFavorite,
    deleteSingleVideo,
  } = useVideosListContext();

  const handleDeleteSingleMovie = () => {
    deleteSingleVideo(movie.path);
  };

  return (
    <S.SingleCardStyle displayType={displayType} data-testid="card">
      <S.CardImageWrapper
        displayType={displayType}
        onClick={() => {
          setSingleVideo(movie);
          setModalIsActive(true);
        }}
      >
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
