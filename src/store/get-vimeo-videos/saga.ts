import { SagaIterator } from 'redux-saga';
import { getType } from 'typesafe-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getVimeoData } from '../../common/axios/vimeo-api';

import { getVimeoVideosStarted } from './actions';
import * as C from './consts';
import { getLocalStorage, favVideo } from '../../helpers/local-storage';

import { TVideosArrItem } from '../types/movie-item';

toast.configure();

export function* getSingleVimeoVideo({
  payload,
}: ReturnType<typeof getVimeoVideosStarted>) {
  try {
    //@ts-ignore
    const request = yield call(getVimeoData, payload.url);

    if (!request.data?.data?.length) {
      toast.error('Video not found');
      yield put({
        type: C.GET_VIMEO_VIDEOS_DATA.success,
        payload: [],
      });
    }

    const favVideos = getLocalStorage(favVideo);
    const favVideosIds = (favVideos ?? []).map(
      (video: TVideosArrItem) => video.path
    );

    const parsedVimeoVideos = request.data.data.map((arrItem: any) => ({
      path: arrItem?.link,
      viewsCount: arrItem?.stats.plays,
      title: arrItem?.name,
      thumbNails: arrItem?.pictures.sizes[4].link,
      likes: arrItem?.metadata.connections.likes.total,
      favorite: favVideosIds.includes(arrItem.link),
      date: Date.now(),
      platform: 'vimeo',
    }));

    yield put({
      type: C.GET_VIMEO_VIDEOS_DATA.success,
      payload: parsedVimeoVideos,
    });
  } catch (e) {
    toast.error('Something went wrong');
    yield put({
      type: C.GET_VIMEO_VIDEOS_DATA.failure,
      payload: { error: 'Something went wrong' },
    });
  }
}

export function* getSingleVimeoVideoSaga(): SagaIterator {
  yield takeLatest(getType(getVimeoVideosStarted), getSingleVimeoVideo);
}
