import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import Vimeo from '@u-wave/react-vimeo';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { modalIsOpenRX, singleModalVideosDataRX } from 'store/modal/selectors';
import { setModalActive } from 'store/modal/actions';

import './style.css';
import * as S from './index.styles';

const youTubeOptions = {
  height: '450px',
  width: '100%',
  playerVars: {
    autoplay: 1,
  },
};

export const VideoModal = () => {
  const dispatch = useDispatch();
  const singleModalVideoData = useSelector(singleModalVideosDataRX);
  const singleModalVideo = {
    title: singleModalVideoData?.title,
    platform: singleModalVideoData?.platform,
    url: singleModalVideoData?.path,
  };

  const isModalOpenedData = useSelector(modalIsOpenRX);

  const onReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };
  const handleCloseModal = () => {
    dispatch(setModalActive(false));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {isModalOpenedData && (
        <S.ModalStyle data-testid="modal">
          <S.ModalHeaderStyle>{singleModalVideo.title}</S.ModalHeaderStyle>
          <S.ModalBodyStyle>
            {singleModalVideo.platform === 'youtube' ? (
              <YouTube
                videoId={singleModalVideo.url}
                opts={youTubeOptions}
                onReady={onReady}
              />
            ) : (
              //@ts-ignore
              <Vimeo
                video={singleModalVideo.url ?? ''}
                autoplay
                width="300px"
                responsive
              />
            )}
          </S.ModalBodyStyle>
          <S.ModalFooterStyle>
            <S.Button
              color="secondary"
              type="submit"
              aria-label="modal"
              onClick={handleCloseModal}
            >
              close
            </S.Button>
          </S.ModalFooterStyle>
        </S.ModalStyle>
      )}
    </div>
  );
};

export const ModalShowVideo = () =>
  ReactDOM.createPortal(<VideoModal />, document.getElementById('root')!);
