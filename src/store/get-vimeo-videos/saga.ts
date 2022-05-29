import { SagaIterator } from 'redux-saga';
import { getType } from 'typesafe-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getVimeoData } from '../../common/axios/vimeo-api';
import {
  getLocalStorage,
  FAV_VIDEOS,
  addItemToLS,
} from '../../helpers/local-storage';
import { getVimeoVideosStarted } from './actions';
import { TVideosArrItem } from '../types/movie-item';
import { EVideosPlatform } from 'types/video-list-context-enums';

import * as C from './consts';

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
      });
    }

    const favVideos = getLocalStorage(FAV_VIDEOS);
    const favVideosIds = (favVideos ?? []).map(
      (video: TVideosArrItem) => video.path
    );
    type TParsedVimeoVideoArrItem = {
      name: string;
      link: string;
      metadata: {
        connections: {
          likes: {
            total: string;
          };
        };
      };
      stats: {
        plays: string;
      };
      pictures: {
        sizes: string;
      };
    };
    const parsedVimeoVideos = request.data.data.map(
      (arrItem: TParsedVimeoVideoArrItem) => ({
        path: arrItem?.link,
        viewsCount: arrItem?.stats.plays,
        title: arrItem?.name,
        thumbNails: arrItem?.pictures.sizes[4].link,
        likes: arrItem?.metadata.connections.likes.total,
        favorite: favVideosIds.includes(arrItem.link),
        date: Date.now(),
        platform: EVideosPlatform.VIMEO,
      })
    );

    const isAlreadyAdded = getLocalStorage(FAV_VIDEOS)?.some(
      (video: TVideosArrItem) => video.path === payload.url
    );

    if (!isAlreadyAdded && !!parsedVimeoVideos[0])
      addItemToLS(parsedVimeoVideos[0]);
    if (isAlreadyAdded) toast.error('Video is already added');

    yield put({
      type: C.GET_VIMEO_VIDEOS_DATA.success,
    });
  } catch (e) {
    toast.error('Something went wrong');

    yield put({
      type: C.GET_VIMEO_VIDEOS_DATA.failure,
    });
  }
}

export function* getSingleVimeoVideoSaga(): SagaIterator {
  yield takeLatest(getType(getVimeoVideosStarted), getSingleVimeoVideo);
}
