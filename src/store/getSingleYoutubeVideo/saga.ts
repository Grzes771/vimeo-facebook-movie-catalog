import { SagaIterator } from 'redux-saga';
import { getType } from 'typesafe-actions';
import { call, put, takeLatest } from 'redux-saga/effects';

import { getYoutubeData } from './../../common/axios/youtube-api';

import { getSingleVideoStarted } from './actions';
import * as C from './consts';

export function* getSingleVideo({
  payload,
}: ReturnType<typeof getSingleVideoStarted>) {
  try {
    //@ts-ignore
    const request = yield call(getYoutubeData, payload.url);
    
    yield put({
      type: C.GET_SINGLE_VIDEO_DATA.success,
      payload: request.data,
    });
  console.log(request.data)
  } catch (e) {
    yield put({
      type: C.GET_SINGLE_VIDEO_DATA.failure,
      payload: { error: 'Something went wrong' },
    });
  }
}

export function* getSingleVideoSaga(): SagaIterator {
  yield takeLatest(getType(getSingleVideoStarted), getSingleVideo);
}
