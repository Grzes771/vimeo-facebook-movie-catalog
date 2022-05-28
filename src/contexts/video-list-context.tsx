import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getVimeoVideosStarted } from 'store/get-vimeo-videos/actions';
import { getYoutubeVideosStarted } from 'store/get-youtube-videos/actions';

import { addYoutubeVideoIsSuccessRX } from 'store/get-youtube-videos/selectors';
import { addVimeoVideoIsSuccessRX } from 'store/get-vimeo-videos/selectors';

import {
  deleteItemFromLS,
  FAV_VIDEOS,
  getLocalStorage,
  setLocalStorage,
} from 'helpers/local-storage';
import { getVideoId } from 'modules/search-form/helpers';

import { TVideosArrItem } from 'store/types/movie-item';
import { EDisplayTypeKeys, EOrderByKeys } from 'types/order-by-keys';
import { YOUTUBE_DEMO } from 'common/demo/youtube-demo';
import { VIMEO_DEMO } from 'common/demo/vimeo-demo';

type TVideosListContextProviderProps = {
  children: JSX.Element[];
};

type TVideosListContextProps = {
  videosList: TVideosArrItem[];
  currentPage: number;
  displayType: EDisplayTypeKeys;
  reloadVideosList: () => void;
  addSingleVideo: (url: string) => void;
  addOrRemoveVideoFromFavorite: (url: string, action: 'add' | 'remove') => void;
  deleteSingleVideo: (url: string) => void;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  handleIsActive: (id: string) => boolean | undefined;
  handleOnClick: (id: string) => void;
};

export const VideosListContext = createContext<TVideosListContextProps>({
  videosList: [],
  currentPage: 0,
  displayType: EDisplayTypeKeys.TILES,
  reloadVideosList: () => {},
  addSingleVideo: () => {},
  addOrRemoveVideoFromFavorite: () => {},
  deleteSingleVideo: () => {},
  setCurrentPage: () => {},
  handleIsActive: () => true,
  handleOnClick: () => {},
});

export const VideosListContextProvider = ({
  children,
}: TVideosListContextProviderProps) => {
  const [videosList, setVideosList] = useState<TVideosArrItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [orderBy, setOrderBy] = useState<EOrderByKeys>(EOrderByKeys.NEWEST);
  const [displayType, setDisplayType] = useState<EDisplayTypeKeys>(
    EDisplayTypeKeys.TILES
  );
  const addYoutubeVideoIsSuccess = useSelector(addYoutubeVideoIsSuccessRX);
  const addVimeoVideoIsSuccess = useSelector(addVimeoVideoIsSuccessRX);

  const dispatch = useDispatch();

  const loadDemo = () => {
    const demoArr = [...YOUTUBE_DEMO, ...VIMEO_DEMO];
    setLocalStorage(FAV_VIDEOS, demoArr);
    setVideosList(demoArr);
  };

  const clearAll = () => {
    deleteItemFromLS(FAV_VIDEOS);
    setVideosList([]);
  };

  const reloadVideosList = () => {
    const currentVideos = getLocalStorage(FAV_VIDEOS) ?? null;
    if (currentVideos) setVideosList(currentVideos);
  };

  const updateState = (newVideosList: TVideosArrItem[]) => {
    setLocalStorage(FAV_VIDEOS, newVideosList);
    setVideosList(newVideosList);
    reloadVideosList();
  };

  const addSingleVideo = (url: string) => {
    if (url.includes('vimeo')) {
      dispatch(getVimeoVideosStarted(url));
    } else {
      const videoId = getVideoId(url);
      dispatch(getYoutubeVideosStarted(videoId));
    }
  };

  const addOrRemoveVideoFromFavorite = (
    url: string,
    action: 'add' | 'remove'
  ) => {
    const currentVideos = getLocalStorage(FAV_VIDEOS);
    const videoIndex = currentVideos.findIndex(
      (item: TVideosArrItem) => item.path === url
    );

    currentVideos[videoIndex].favorite = action === 'add';

    updateState(currentVideos);
  };

  const deleteSingleVideo = (url: string) => {
    const currentVideos = getLocalStorage(FAV_VIDEOS);
    const videoIndex = currentVideos.findIndex(
      (item: TVideosArrItem) => item.path === url
    );
    videoIndex === -1
      ? toast.error('Video not found')
      : currentVideos.splice(videoIndex, 1);
    updateState(currentVideos);
    toast.success('Video removed');
  };

  const orderByNewest = () => {
    const currentVideos = videosList.sort(
      (a: TVideosArrItem, b: TVideosArrItem) => a.date - b.date
    );
    setOrderBy(EOrderByKeys.NEWEST);
    updateState(currentVideos);
  };

  const orderByOldest = () => {
    const currentVideos = videosList.sort(
      (a: TVideosArrItem, b: TVideosArrItem) => b.date - a.date
    );
    setOrderBy(EOrderByKeys.OLDEST);
    updateState(currentVideos);
  };

  const handleIsActive = (id: string): boolean | undefined => {
    console.log({ id });
    switch (id) {
      case EOrderByKeys.NEWEST:
        return id === EOrderByKeys.NEWEST && orderBy === EOrderByKeys.NEWEST;
      case EOrderByKeys.OLDEST:
        return id === EOrderByKeys.OLDEST && orderBy === EOrderByKeys.OLDEST;
      case EDisplayTypeKeys.TILES:
        return displayType === EDisplayTypeKeys.TILES;
      case EDisplayTypeKeys.LIST:
        return displayType === EDisplayTypeKeys.LIST;
      default:
        break;
    }
  };

  const handleOnClick = (id: string) => {
    switch (id) {
      case 'clearAll':
        clearAll();
        break;
      case 'loadDemo':
        loadDemo();
        break;
      case EOrderByKeys.NEWEST:
        orderByNewest();
        break;
      case EOrderByKeys.OLDEST:
        orderByOldest();
        break;
      case EDisplayTypeKeys.TILES:
        setDisplayType(EDisplayTypeKeys.TILES);
        break;
      case EDisplayTypeKeys.LIST:
        setDisplayType(EDisplayTypeKeys.LIST);
        break;
      default:
        break;
    }
  };

  console.log({ orderBy, displayType });

  const memoizedValue = useMemo(
    () => ({
      videosList,
      currentPage,
      displayType,
      reloadVideosList,
      addSingleVideo,
      addOrRemoveVideoFromFavorite,
      deleteSingleVideo,
      setCurrentPage,
      handleIsActive,
      handleOnClick,
    }),
    [JSON.stringify(videosList), currentPage, orderBy, displayType]
  );

  useEffect(() => {
    reloadVideosList();
  }, []);

  useEffect(() => {
    if (addYoutubeVideoIsSuccess || addVimeoVideoIsSuccess) reloadVideosList();
  }, [addYoutubeVideoIsSuccess, addVimeoVideoIsSuccess]);

  return (
    <VideosListContext.Provider value={memoizedValue}>
      {children}
    </VideosListContext.Provider>
  );
};

export const useVideosListContext = (): TVideosListContextProps => {
  return useContext(VideosListContext);
};
