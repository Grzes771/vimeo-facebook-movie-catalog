import { SagaIterator } from 'redux-saga';
import { getType } from 'typesafe-actions';
import { call, put, takeLatest } from 'redux-saga/effects';

import { getYoutubeData } from '../../common/axios/youtube-api';

import { getYoutubeVideosStarted } from './actions';
import * as C from './consts';
import { getLocalStorage, favVideo } from '../../helpers/local-storage';
import { TVideosArrItem } from '../types/movie-item';

export function* getYoutubeVideos({
  payload,
}: ReturnType<typeof getYoutubeVideosStarted>) {
  try {
    //@ts-ignore
    const request = yield call(getYoutubeData, payload.url);

    const favVideos = getLocalStorage(favVideo);
    const favVideosIds = (favVideos ?? []).map(
      (video: TVideosArrItem) => video.path
    );

    const parsedYoutubeVideos = request.data.items.map((arrItem: any) => ({
      path: arrItem?.id,
      viewsCount: arrItem?.statistics.viewCount,
      title: arrItem?.snippet.localized.title,
      thumbNails: arrItem?.snippet.thumbnails.medium.url,
      likes: arrItem?.statistics.likeCount,
      favorite: favVideosIds.includes(arrItem.id),
      date: Date.now(),
      platform: 'youtube',
    }));

    yield put({
      type: C.GET_YOUTUBE_VIDEOS_DATA.success,
      payload: parsedYoutubeVideos,
    });
  } catch (e) {
    yield put({
      type: C.GET_YOUTUBE_VIDEOS_DATA.failure,
      payload: { error: 'Something went wrong' },
    });
  }
}

export function* getSingleVideoSaga(): SagaIterator {
  yield takeLatest(getType(getYoutubeVideosStarted), getYoutubeVideos);
}
