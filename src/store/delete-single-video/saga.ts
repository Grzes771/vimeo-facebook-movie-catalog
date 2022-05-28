import { SagaIterator } from 'redux-saga';
import { getType } from 'typesafe-actions';
import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { deleteSingleVideoStarted } from './actions';
import {
  getLocalStorage,
  FAV_VIDEOS,
  setLocalStorage,
} from '../../helpers/local-storage';
import { TVideosArrItem } from '../types/movie-item';

import { DELETE_SINGLE_VIDEO } from './consts';

toast.configure();

export function* deleteSingleVideo({
  payload,
}: ReturnType<typeof deleteSingleVideoStarted>) {
  const list = getLocalStorage(FAV_VIDEOS);
  const songIndex = list.findIndex(
    (item: TVideosArrItem) => item.path === payload.url
  );

  if (songIndex === -1) {
    toast.error('Video not found');

    yield put({
      type: DELETE_SINGLE_VIDEO.failure,
    });

    return;
  }

  toast.success('Video removed');

  yield put({
    type: DELETE_SINGLE_VIDEO.success,
  });
}

export function* deleteSingleVideoSaga(): SagaIterator {
  yield takeLatest(getType(deleteSingleVideoStarted), deleteSingleVideo);
}
