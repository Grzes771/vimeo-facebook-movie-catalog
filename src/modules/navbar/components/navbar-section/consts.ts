import {
  EDisplayTypeKeys,
  EOrderByKeys,
  EVideosListActions,
  EVideosListTypeKeys,
} from 'types/video-list-context-enums';
import { ENavbarSectionKeys, TNavbarSection } from './types';

type TNavbarSectionsProps = {
  handleIsActive: (id: string) => boolean | undefined;
  handleOnClick: (
    id:
      | EVideosListActions
      | EOrderByKeys
      | EDisplayTypeKeys
      | EVideosListTypeKeys
  ) => void;
};

export const NAVBAR_SECTIONS = ({
  handleIsActive,
  handleOnClick,
}: TNavbarSectionsProps): TNavbarSection[] => [
  {
    [ENavbarSectionKeys.LABEL]: 'Akcje',
    [ENavbarSectionKeys.LEFT_BUTTON_LABEL]: 'Wyczyść',
    [ENavbarSectionKeys.RIGHT_BUTTON_LABEL]: 'Wgraj demo',
    [ENavbarSectionKeys.ID_LEFT]: EVideosListActions.CLEAR_ALL,
    [ENavbarSectionKeys.ID_RIGHT]: EVideosListActions.LOAD_DEMO,
    [ENavbarSectionKeys.BUTTON_IS_ACTIVE]: handleIsActive,
    [ENavbarSectionKeys.BUTTON_ON_CLICK]: handleOnClick,
  },
  {
    [ENavbarSectionKeys.LABEL]: 'Kojelność',
    [ENavbarSectionKeys.LEFT_BUTTON_LABEL]: 'Od najnowszych',
    [ENavbarSectionKeys.RIGHT_BUTTON_LABEL]: 'Od najstarszych',
    [ENavbarSectionKeys.ID_LEFT]: EOrderByKeys.NEWEST,
    [ENavbarSectionKeys.ID_RIGHT]: EOrderByKeys.OLDEST,
    [ENavbarSectionKeys.BUTTON_IS_ACTIVE]: handleIsActive,
    [ENavbarSectionKeys.BUTTON_ON_CLICK]: handleOnClick,
  },
  {
    [ENavbarSectionKeys.LABEL]: 'Widok',
    [ENavbarSectionKeys.LEFT_BUTTON_LABEL]: 'Kafelki',
    [ENavbarSectionKeys.RIGHT_BUTTON_LABEL]: 'Lista',
    [ENavbarSectionKeys.ID_LEFT]: EDisplayTypeKeys.TILES,
    [ENavbarSectionKeys.ID_RIGHT]: EDisplayTypeKeys.LIST,
    [ENavbarSectionKeys.BUTTON_IS_ACTIVE]: handleIsActive,
    [ENavbarSectionKeys.BUTTON_ON_CLICK]: handleOnClick,
  },
];
