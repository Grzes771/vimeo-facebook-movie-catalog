import axios from 'axios';

const vimeoInstance = axios.create({
  baseURL: 'https://api.vimeo.com/videos/',
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_VIMEO_API_KEY}`,
  },
});

export const getVimeoData = (url: string) =>
  vimeoInstance
    .get('/', {
      params: {
        links: url,
      },
    })
    .then((res) => res)
    .catch((err) => Promise.reject(err));
