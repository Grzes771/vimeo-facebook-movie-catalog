import { fork } from 'redux-saga/effects';
import { setVimeoFavoriteSaga } from './add-delete-favorite-vimeo/saga';
import { setYoutubeFavoriteSaga } from './add-delete-favorite-youtube/saga';
import { deleteSingleVideoSaga } from './delete-single-video/saga';
import { getSingleVimeoVideoSaga } from './get-vimeo-videos/saga';
import { getSingleVideoSaga } from './get-youtube-videos/saga';
export function* rootSaga(services = {}) {
  yield fork(getSingleVideoSaga);
  yield fork(getSingleVimeoVideoSaga);
  yield fork(setYoutubeFavoriteSaga);
  yield fork(setVimeoFavoriteSaga);
  yield fork(deleteSingleVideoSaga);
}
