import { useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useNavigate } from 'react-router-dom';
import Vimeo from '@u-wave/react-vimeo';

import { useVideosListContext } from 'contexts/video-list-context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faStar,
  faThumbsUp,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

import {
  EFavoriteVideosActions,
  EVideosPlatform,
} from 'types/video-list-context-enums';

import { VIMEO_YOUTUBE_MOVIE_CATALOG } from 'App';

import * as S from './index.styles';
import './style.css';

const youTubeOptions = {
  height: '450px',
  width: '100%',
  playerVars: {
    autoplay: 1,
  },
};

export const VideoModal = () => {
  const {
    singleVideo,

    addOrRemoveVideoFromFavorite,
    deleteSingleVideo,
  } = useVideosListContext();

  const navigate = useNavigate();

  const DELETE_ITEM_MODAL_MESSAGE = 'Czy na pewno chcesz usunąć ten film?';

  const onReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };

  useEffect(() => {
    if (!singleVideo) navigate(`/${VIMEO_YOUTUBE_MOVIE_CATALOG}`);
  }, []);

  const handleDeleteSingleMovie = () => {
    if (window.confirm(DELETE_ITEM_MODAL_MESSAGE))
      deleteSingleVideo(singleVideo?.path);
    navigate(`/${VIMEO_YOUTUBE_MOVIE_CATALOG}`);
  };

  const parseDate = (miliseconds: number | undefined) => {
    if (!miliseconds) return '';
    const currentDate = new Date(miliseconds);
    return currentDate.toISOString().split('T')[0];
  };

  return (
    <S.Container>
      <S.ModalHeaderStyle>
        <p>{singleVideo?.title}</p>
        <div>
          <span>
            <FontAwesomeIcon
              icon={faStar}
              className={`${
                singleVideo?.favorite === true ? 'active-star' : ''
              }`}
              onClick={() =>
                addOrRemoveVideoFromFavorite(
                  singleVideo?.path,
                  singleVideo?.favorite
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
      </S.ModalHeaderStyle>
      <S.ModalStyle data-testid="modal">
        <S.ModalBodyStyle>
          {singleVideo?.platform === EVideosPlatform.YOUTUBE ? (
            <YouTube
              videoId={singleVideo?.path}
              opts={youTubeOptions}
              onReady={onReady}
            />
          ) : (
            //@ts-ignore
            <Vimeo
              video={singleVideo?.path ?? ''}
              autoplay
              width="300px"
              responsive
            />
          )}
        </S.ModalBodyStyle>
      </S.ModalStyle>
      <S.ModalFooterStyle>
        <div>
          {singleVideo?.viewsCount && (
            <span>
              <FontAwesomeIcon icon={faEye} />
              {` ${singleVideo?.viewsCount}`}
            </span>
          )}
          {singleVideo?.likes && (
            <span>
              <FontAwesomeIcon icon={faThumbsUp} />
              {` ${singleVideo?.likes}`}
            </span>
          )}
        </div>
        <p>Data dodania: {parseDate(singleVideo?.date)}</p>
      </S.ModalFooterStyle>
    </S.Container>
  );
};
