import { fork } from 'redux-saga/effects';
import { getSingleVimeoVideoSaga } from './getVimeoVideos/saga';
import { getSingleVideoSaga } from './getYoutubeVideos/saga';
export function* rootSaga(services = {}) {
  yield fork(getSingleVideoSaga);
  yield fork(getSingleVimeoVideoSaga);
}
