export enum EOrderByKeys {
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export enum EDisplayTypeKeys {
  TILES = 'tiles',
  LIST = 'list',
}

export enum EVideosListTypeKeys {
  FAVORITE = 'favorite',
  ALL = 'all',
}

export enum EVideosPlatform {
  YOUTUBE = 'youtube',
  VIMEO = 'vimeo',
}

export enum EFavoriteVideosActions {
  ADD = 'add',
  REMOVE = 'remove',
}

export enum EVideosListActions {
  CLEAR_ALL = 'clearAll',
  LOAD_DEMO = 'loadDemo',
}
export type TIdsValues =
  | EVideosListActions
  | EOrderByKeys
  | EDisplayTypeKeys
  | EVideosListTypeKeys;
