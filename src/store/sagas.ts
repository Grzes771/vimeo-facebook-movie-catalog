import { fork } from 'redux-saga/effects';
import { getSingleVimeoVideoSaga } from './get-vimeo-videos/saga';
import { getSingleVideoSaga } from './get-youtube-videos/saga';
export function* rootSaga(services = {}) {
  yield fork(getSingleVideoSaga);
  yield fork(getSingleVimeoVideoSaga);
}
