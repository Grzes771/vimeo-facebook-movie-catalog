import { createAction } from 'typesafe-actions';

import { DELETE_SINGLE_VIDEO } from './consts';

export const deleteSingleVideoStarted = createAction(
  DELETE_SINGLE_VIDEO.started,
  (url: string) => ({
    url,
  })
)();
