import React, { Dispatch, SetStateAction, useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import Vimeo from '@u-wave/react-vimeo';
import ReactDOM from 'react-dom';

import { useVideosListContext } from 'contexts/video-list-context';

import { EVideosPlatform } from 'types/video-list-context-enums';

import './style.css';
import * as S from './index.styles';

const youTubeOptions = {
  height: '450px',
  width: '100%',
  playerVars: {
    autoplay: 1,
  },
};

type TModalShowVideo = {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const VideoModal = ({ setModalIsOpen }: TModalShowVideo) => {
  const { modalIsActive, setModalIsActive, singleVideo, setSingleVideo } =
    useVideosListContext();

  const onReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };

  useEffect(() => {
    setModalIsOpen(modalIsActive);
  }, [modalIsActive]);

  return (
    <S.Container>
      {modalIsActive && (
        <S.ModalStyle data-testid="modal">
          <S.ModalHeaderStyle>{singleVideo?.title}</S.ModalHeaderStyle>
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
          <S.ModalFooterStyle>
            <S.StyledButton
              color="secondary"
              type="submit"
              aria-label="modal"
              onClick={() => {
                setSingleVideo(undefined);
                setModalIsActive(false);
              }}
            >
              close
            </S.StyledButton>
          </S.ModalFooterStyle>
        </S.ModalStyle>
      )}
    </S.Container>
  );
};

export const ModalShowVideo = ({ setModalIsOpen }: any) =>
  ReactDOM.createPortal(
    <VideoModal {...{ setModalIsOpen }} />,
    document.getElementById('root')!
  );
