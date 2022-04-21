import React, { MouseEventHandler } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import YouTube, { YouTubeProps } from 'react-youtube';
import Vimeo from '@u-wave/react-vimeo';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  modalIsOpenRX,
  singleModalVideosDataRX,
} from '../../store/modal/selectors';
import { setModalActiveStarted } from '../../store/modal/actions';
import './style.css';

const youTubeOptions = {
  height: '450px',
  width: '100%',
  playerVars: {
    autoplay: 1,
  },
};

const ModalInnerVideo: React.FC = () => {
  const dispatch = useDispatch();

  const singleModalVideoData = useSelector(singleModalVideosDataRX);
  const singleModalVideo = {
    title: singleModalVideoData?.video.title,
    platform: singleModalVideoData?.video.platform,
    url: singleModalVideoData?.video.path,
  };

  const isModalOpenedData = useSelector(modalIsOpenRX);

  const onReady: YouTubeProps['onReady'] = (event) => {
    event.target.pauseVideo();
  };
  const handleCloseModal = () => {
    dispatch(setModalActiveStarted(false));
  };
  return (
    <Modal
      data-testid="modal"
      className="modal-dialog modal-lg"
      isOpen={isModalOpenedData}
      modalTransition={{ timeout: 200 }}
      backdropTransition={{ timeout: 200 }}
    >
      <ModalHeader>{singleModalVideo.title}</ModalHeader>
      <ModalBody>
        {singleModalVideo.platform === 'youtube' ? (
          <YouTube
            videoId={singleModalVideo.url}
            opts={youTubeOptions}
            onReady={onReady}
          />
        ) : (
          //@ts-ignore
          <Vimeo
            video={singleModalVideo.url}
            autoplay
            width="300px"
            responsive
          />
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          type="submit"
          aria-label="modal"
          onClick={handleCloseModal}
        >
          close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export const ModalShowVideo = () =>
  ReactDOM.createPortal(<ModalInnerVideo />, document.getElementById('root')!);
