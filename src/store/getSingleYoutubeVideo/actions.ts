import { createAction } from 'typesafe-actions';

import { GET_SINGLE_VIDEO_DATA } from './consts';

type TGetSingleVideoStarted = {
  url: string;
};

export const getSingleVideoStarted = createAction(
  GET_SINGLE_VIDEO_DATA.started,
  (url): TGetSingleVideoStarted => ({
    url,
  })
)();
