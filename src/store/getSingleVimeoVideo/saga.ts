import { SagaIterator } from 'redux-saga';
import { getType } from 'typesafe-actions';
import { call, put, takeLatest } from 'redux-saga/effects';

import { getVimeoData } from './../../common/axios/vimeo-api';

import { getSingleVimeoVideoStarted } from './actions';
import * as C from './consts';

export function* getSingleVimeoVideo({
  payload,
}: ReturnType<typeof getSingleVimeoVideoStarted>) {
  try {
    //@ts-ignore
    const request = yield call(getVimeoData, payload.url);
  
    yield put({
      type: C.GET_SINGLE_VIMEO_VIDEO_DATA.success,
      payload: request.data.data[0],
    });

  } catch (e) {
    yield put({
      type: C.GET_SINGLE_VIMEO_VIDEO_DATA.failure,
      payload: { error: 'Something went wrong' },
    });
  }
}

export function* getSingleVimeoVideoSaga(): SagaIterator {
  yield takeLatest(getType(getSingleVimeoVideoStarted), getSingleVimeoVideo);
}
