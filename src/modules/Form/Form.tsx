import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Label, Input, FormGroup } from 'reactstrap';
import './style.css';
import useLocalStorage from '../../helpers/useLocalStorage';
import { getSingleVimeoVideoStarted } from '../../store/getSingleVimeoVideo/actions';
import { getSingleVimeoVideo } from '../../store/getSingleVimeoVideo/saga';
import { singleVimeoVideoData } from '../../store/getSingleVimeoVideo/selectors';
import { getSingleVideoStarted } from '../../store/getSingleYoutubeVideo/actions';
import { singleYoutubeVideoData } from '../../store/getSingleYoutubeVideo/selectors';
import { getVideoId } from './helpers';

export const Formular = (props: any) => {
  const { videosLocalContainer, setVideosLocalContainer } = props

  const [link, setLink] = useState('');
 
  const dispatch = useDispatch();

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const videoId = getVideoId(link)
    dispatch(getSingleVideoStarted(videoId));
    dispatch(getSingleVimeoVideoStarted(link));

  };


const SingleYoutubeVideo = useSelector(singleYoutubeVideoData)
console.log(SingleYoutubeVideo)
const SingleYoutubeVideoData = {
  path: SingleYoutubeVideo?.id,
  viewsCount: SingleYoutubeVideo?.statistics.viewCount,
  title: SingleYoutubeVideo?.snippet.localized.title,
  thumbNails: SingleYoutubeVideo?.snippet.thumbnails.medium.url,
  likes: SingleYoutubeVideo?.statistics.likeCount,
  favorite: false,
  date: Date.now(),

  }
  const SingleVimeoVideo = useSelector(singleVimeoVideoData)
  const SingleVimeoVideoData = {
    path: SingleVimeoVideo?.uri,
    viewsCount: SingleVimeoVideo?.stats.plays,
    title: SingleVimeoVideo?.name,
    thumbNails: SingleVimeoVideo?.pictures.base_link,
    likes: SingleVimeoVideo?.metadata.connections.likes.total,
    favorite: false,
    date: Date.now(),
}
console.log(SingleVimeoVideo)
    useEffect(() => {
      if (SingleVimeoVideo) setVideosLocalContainer([...videosLocalContainer, SingleVimeoVideoData])
      if (SingleYoutubeVideo) setVideosLocalContainer([...videosLocalContainer, SingleYoutubeVideoData])
    }, [SingleYoutubeVideo, SingleVimeoVideo]);
 

  
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
      <Button color='success'>Submit</Button>
     
    </Form>
  );
};
