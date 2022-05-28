import { useDispatch } from 'react-redux';

import { TVideosArrItem } from 'store/types/movie-item';
import { setModalActive, setVideoDetails } from 'store/modal/actions';
import { useVideosListContext } from 'contexts/video-list-context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faStar,
  faTrashAlt,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import {
  SingleCardStyle,
  CardImageWrapper,
  ContentWrapper,
  CardHeaderStyle,
  CardFooterStyle,
} from './index.styles';
import './icons-styles.css';

type TSingleMovie = {
  movie: TVideosArrItem;
};

export const SingleMovie = ({ movie }: TSingleMovie) => {
  const { displayType, addOrRemoveVideoFromFavorite, deleteSingleVideo } =
    useVideosListContext();

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(setModalActive(true));
    dispatch(setVideoDetails(movie));
  };

  const handleDeleteSingleMovie = () => {
    deleteSingleVideo(movie.path);
  };

  /* const truncateText = (str: string) => {
    return str.length > 40 ? str.substring(0, 50) + '...' : str;
  }; */

  return (
    <SingleCardStyle displayType={displayType} data-testid="card">
      <CardImageWrapper displayType={displayType}>
        <img src={movie.thumbNails} alt="thumbnail" onClick={handleOpenModal} />
      </CardImageWrapper>
      <ContentWrapper displayType={displayType}>
        <CardHeaderStyle displayType={displayType}>
          <p>{movie.title}</p>
        </CardHeaderStyle>
        <CardFooterStyle displayType={displayType}>
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
                    movie?.favorite ? 'remove' : 'add'
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
        </CardFooterStyle>
      </ContentWrapper>
    </SingleCardStyle>
  );
};
