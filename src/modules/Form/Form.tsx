import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Label, Input, FormGroup } from 'reactstrap';

import { getVimeoVideosStarted } from '../../store/getSingleVimeoVideo/actions';
import { getYoutubeVideosStarted } from '../../store/getSingleYoutubeVideo/actions';
import { getVideoId } from './helpers';

import './style.css';

export const Formular = () => {
  const [link, setLink] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const videoId = getVideoId(link);
    dispatch(getYoutubeVideosStarted(videoId));
    dispatch(getVimeoVideosStarted(link));
  };

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="link">add link</Label>
        <Input
          name="link"
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="put video link..."
        />
        <span className="error-message"></span>
      </FormGroup>
      <Button color="success">Submit</Button>
    </Form>
  );
};
