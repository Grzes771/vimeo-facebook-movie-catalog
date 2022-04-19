import { createAction } from 'typesafe-actions';

import { GET_SINGLE_VIMEO_VIDEO_DATA } from './consts';

type TGetSingleVideoStarted = {
  url: string;
};

export const getSingleVimeoVideoStarted = createAction(
  GET_SINGLE_VIMEO_VIDEO_DATA.started,
  (url): TGetSingleVideoStarted => ({
    url,
  })
)();
