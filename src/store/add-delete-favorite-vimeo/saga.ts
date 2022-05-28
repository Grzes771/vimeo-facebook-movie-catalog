import { SagaIterator } from 'redux-saga';
import { getType } from 'typesafe-actions';
import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { setVimeoFavoriteStarted } from './actions';
import {
  getLocalStorage,
  FAV_VIDEOS,
  setLocalStorage,
} from '../../helpers/local-storage';
import { TVideosArrItem } from '../types/movie-item';

import * as C from './consts';
import { SET_VIMEO_FAVORITE } from './consts';

toast.configure();

export function* setVimeoFavorite({
  payload,
}: ReturnType<typeof setVimeoFavoriteStarted>) {
  try {
    const list = getLocalStorage(FAV_VIDEOS);
    const videoIndex = list.findIndex(
      (item: TVideosArrItem) => item.path === payload.url
    );
    list[videoIndex].favorite = !list[videoIndex].favorite;
    setLocalStorage(FAV_VIDEOS, list);

    if (!list.length) {
      toast.error('Video not found');

      yield put({
        type: SET_VIMEO_FAVORITE.success,
        payload: [],
      });
    }

    toast.success(
      list[videoIndex].favorite ? 'Added to favorite' : 'Removed from favorite'
    );

    yield put({
      type: SET_VIMEO_FAVORITE.success,
    });
  } catch (e) {
    toast.error('Something went wrong');

    yield put({
      type: SET_VIMEO_FAVORITE.failure,
      payload: { error: 'Something went wrong' },
    });
  }
}

export function* setVimeoFavoriteSaga(): SagaIterator {
  yield takeLatest(getType(setVimeoFavoriteStarted), setVimeoFavorite);
}
