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
import {
  EDisplayTypeKeys,
  EFavoriteVideosActions,
  EOrderByKeys,
  EVideosListActions,
  EVideosListTypeKeys,
  EVideosPlatform,
  TIdsValues,
} from 'types/video-list-context-enums';

import { YOUTUBE_DEMO } from 'common/demo/youtube-demo';
import { VIMEO_DEMO } from 'common/demo/vimeo-demo';

type TVideosListContextProviderProps = {
  children: JSX.Element[];
};

type TVideosListContextProps = {
  videosList: TVideosArrItem[];
  videosTotalCount: number;
  currentPage: number;
  displayType: EDisplayTypeKeys;
  listType: EVideosListTypeKeys;
  modalIsActive: boolean;
  singleVideo: TVideosArrItem | undefined;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setListType: Dispatch<SetStateAction<EVideosListTypeKeys>>;
  setModalIsActive: Dispatch<SetStateAction<boolean>>;
  setSingleVideo: Dispatch<SetStateAction<TVideosArrItem | undefined>>;
  reloadVideosList: () => void;
  addSingleVideo: (url: string) => void;
  addOrRemoveVideoFromFavorite: (
    url: string | undefined,
    action: EFavoriteVideosActions
  ) => void;
  deleteSingleVideo: (url: string | undefined) => void;
  handleIsActive: (id: string) => boolean | undefined;
  handleOnClick: (id: TIdsValues) => void;
};

export const VideosListContext = createContext<TVideosListContextProps>({
  videosList: [],
  videosTotalCount: 0,
  currentPage: 0,
  displayType: EDisplayTypeKeys.TILES,
  listType: EVideosListTypeKeys.ALL,
  modalIsActive: false,
  singleVideo: undefined,
  setCurrentPage: () => {},
  setListType: () => {},
  setModalIsActive: () => {},
  setSingleVideo: () => {},
  reloadVideosList: () => {},
  addSingleVideo: () => {},
  addOrRemoveVideoFromFavorite: () => {},
  deleteSingleVideo: () => {},
  handleIsActive: () => true,
  handleOnClick: () => {},
});

export const VideosListContextProvider = ({
  children,
}: TVideosListContextProviderProps) => {
  const [listType, setListType] = useState<EVideosListTypeKeys>(
    EVideosListTypeKeys.ALL
  );
  const [orderBy, setOrderBy] = useState<EOrderByKeys>(EOrderByKeys.NEWEST);
  const [displayType, setDisplayType] = useState<EDisplayTypeKeys>(
    EDisplayTypeKeys.TILES
  );
  const [videosList, setVideosList] = useState<TVideosArrItem[]>([]);
  const [videosTotalCount, setVideosTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [modalIsActive, setModalIsActive] = useState<boolean>(false);
  const [singleVideo, setSingleVideo] = useState<TVideosArrItem | undefined>(
    undefined
  );

  const addYoutubeVideoIsSuccess = useSelector(addYoutubeVideoIsSuccessRX);
  const addVimeoVideoIsSuccess = useSelector(addVimeoVideoIsSuccessRX);

  const dispatch = useDispatch();

  const PAGE_SIZE = 12;

  const DELETE_ALL_ITEM_MODAL_MESSAGE =
    'Czy na pewno chcesz usunąć wszystkie filmy?';

  const currentVideosList =
    listType === EVideosListTypeKeys.FAVORITE
      ? videosList
          .filter((video) => video.favorite)
          ?.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE)
      : videosList?.slice(
          currentPage * PAGE_SIZE,
          (currentPage + 1) * PAGE_SIZE
        );

  const loadDemo = () => {
    const demoArr = [...YOUTUBE_DEMO, ...VIMEO_DEMO];
    setLocalStorage(FAV_VIDEOS, demoArr);
    setVideosList(demoArr);
  };

  const clearAll = () => {
    if (videosList.length === 0) return;
    if (window.confirm(DELETE_ALL_ITEM_MODAL_MESSAGE)) {
      deleteItemFromLS(FAV_VIDEOS);
      setVideosList([]);
    }
  };

  const reloadVideosList = () => {
    const currentVideos = getLocalStorage(FAV_VIDEOS) ?? null;
    if (currentVideos) {
      setVideosList(currentVideos);
      setVideosTotalCount(currentVideos.length);
    }
  };

  const updateState = (newVideosList: TVideosArrItem[]) => {
    setLocalStorage(FAV_VIDEOS, newVideosList);
    setVideosList(newVideosList);
    reloadVideosList();
  };

  const addSingleVideo = (url: string) => {
    if (url.includes(EVideosPlatform.VIMEO)) {
      dispatch(getVimeoVideosStarted(url));
    } else {
      const videoId = getVideoId(url);
      dispatch(getYoutubeVideosStarted(videoId));
    }
  };

  const addOrRemoveVideoFromFavorite = (
    url: string | undefined,
    action: EFavoriteVideosActions
  ) => {
    const currentVideos = getLocalStorage(FAV_VIDEOS);
    const videoIndex = currentVideos.findIndex(
      (item: TVideosArrItem) => item.path === url
    );
    currentVideos[videoIndex].favorite = action === EFavoriteVideosActions.ADD;
    currentVideos[videoIndex].favorite === true
      ? toast.success('Dodano do ulubionych')
      : toast.success('Usunięto z ulubionych');
    updateState(currentVideos);
  };

  const deleteSingleVideo = (url: string | undefined) => {
    const currentVideos = getLocalStorage(FAV_VIDEOS);
    const videoIndex = currentVideos.findIndex(
      (item: TVideosArrItem) => item.path === url
    );
    videoIndex === -1
      ? toast.error('Nie znaleziono filmu')
      : currentVideos.splice(videoIndex, 1);
    updateState(currentVideos);
    toast.success('Film usunięty');
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

  const handleOnClick = (id: TIdsValues) => {
    switch (id) {
      case EVideosListActions.CLEAR_ALL:
        clearAll();
        break;
      case EVideosListActions.LOAD_DEMO:
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
      case EVideosListTypeKeys.ALL:
        setListType(EVideosListTypeKeys.ALL);
        break;
      case EVideosListTypeKeys.FAVORITE:
        setListType(EVideosListTypeKeys.FAVORITE);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    reloadVideosList();
  }, []);

  useEffect(() => {
    if (addYoutubeVideoIsSuccess || addVimeoVideoIsSuccess) reloadVideosList();
  }, [addYoutubeVideoIsSuccess, addVimeoVideoIsSuccess]);

  const memoizedValue = useMemo(
    () => ({
      videosList: currentVideosList,
      videosTotalCount,
      currentPage,
      displayType,
      listType,
      modalIsActive,
      singleVideo,
      setCurrentPage,
      setListType,
      setModalIsActive,
      setSingleVideo,
      reloadVideosList,
      addSingleVideo,
      addOrRemoveVideoFromFavorite,
      deleteSingleVideo,
      handleIsActive,
      handleOnClick,
    }),
    [
      JSON.stringify(videosList),
      videosList.length,
      currentPage,
      orderBy,
      displayType,
      listType,
      modalIsActive,
      singleVideo,
    ]
  );

  return (
    <VideosListContext.Provider value={memoizedValue}>
      {children}
    </VideosListContext.Provider>
  );
};

export const useVideosListContext = (): TVideosListContextProps => {
  return useContext(VideosListContext);
};
