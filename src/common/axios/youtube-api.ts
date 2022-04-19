import axios from 'axios';

export const youtubeInstance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
    part: 'snippet',
  },
});

export const getYoutubeData = (url: string) =>
  youtubeInstance
    .get('/videos', {
      params: {
        id: url,
        part: 'snippet, statistics',
      },
    })
    .then((res) => res)
    .catch((err) => Promise.reject(err));
