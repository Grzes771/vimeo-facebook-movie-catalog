import { SagaIterator } from 'redux-saga';
import { getType } from 'typesafe-actions';
import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { setYtFavoriteStarted } from './actions';
import {
  getLocalStorage,
  FAV_VIDEOS,
  setLocalStorage,
} from '../../helpers/local-storage';
import { TVideosArrItem } from '../types/movie-item';

import { SET_YOUTUBE_FAVORITE } from './consts';

toast.configure();

export function* setYoutubeFavorite({
  payload,
}: ReturnType<typeof setYtFavoriteStarted>) {
  try {
    //@ts-ignore
    const list = getLocalStorage(FAV_VIDEOS);
    const songIndex = list.findIndex(
      (item: TVideosArrItem) => item.path === payload.url
    );
    list[songIndex].favorite = !list[songIndex].favorite;
    setLocalStorage(FAV_VIDEOS, list);

    if (!list.length) {
      toast.error('Video not found');
      yield put({
        type: SET_YOUTUBE_FAVORITE.success,
        payload: [],
      });
    }
    toast.success(
      list[songIndex].favorite ? 'Added to favorite' : 'Removed from favorite'
    );
    yield put({
      type: SET_YOUTUBE_FAVORITE.success,
    });
  } catch (e) {
    toast.error('Something went wrong');

    yield put({
      type: SET_YOUTUBE_FAVORITE.failure,
      payload: { error: 'Something went wrong' },
    });
  }
}

export function* setYoutubeFavoriteSaga(): SagaIterator {
  yield takeLatest(getType(setYtFavoriteStarted), setYoutubeFavorite);
}
