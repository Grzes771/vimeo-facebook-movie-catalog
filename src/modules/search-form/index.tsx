import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { getVimeoVideosStarted } from 'store/get-vimeo-videos/actions';
import { getYoutubeVideosStarted } from 'store/get-youtube-videos/actions';
import { getVideoId } from './helpers';

import { FormStyle } from './index.styles';
import './style.css';
import { ButtonStyle } from './index.styles';

export const SearchForm = () => {
  const [link, setLink] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (link.includes('vimeo')) {
      dispatch(getVimeoVideosStarted(link));
      setLink('');
    } else {
      const videoId = getVideoId(link);
      dispatch(getYoutubeVideosStarted(videoId));
      setLink('');
    }
  };

  return (
    <>
      <FormStyle onSubmit={handleSubmit}>
        <div>
          <input
            name="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="put video link..."
          />
          <span className="error-message"></span>
        </div>
        <ButtonStyle color="success">Dodaj</ButtonStyle>
      </FormStyle>
    </>
  );
};
