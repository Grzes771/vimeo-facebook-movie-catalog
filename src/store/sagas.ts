import { fork } from 'redux-saga/effects';
import { getSingleVimeoVideoSaga } from './getSingleVimeoVideo/saga';
import { getSingleVideoSaga } from './getSingleYoutubeVideo/saga';
export function* rootSaga(services = {}) {
  yield fork(getSingleVideoSaga);
  yield fork(getSingleVimeoVideoSaga)
}
