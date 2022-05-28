import { EDisplayTypeKeys, EOrderByKeys } from 'types/order-by-keys';
import { ENavbarSectionKeys, TNavbarSection } from './types';

type TNavbarSectionsProps = {
  handleIsActive: (id: string) => boolean | undefined;
  handleOnClick: (id: string) => void;
};

export const NAVBAR_SECTIONS = ({
  handleIsActive,
  handleOnClick,
}: TNavbarSectionsProps): TNavbarSection[] => [
  {
    [ENavbarSectionKeys.LABEL]: 'Akcje',
    [ENavbarSectionKeys.LEFT_BUTTON_LABEL]: 'Wyczyść',
    [ENavbarSectionKeys.RIGHT_BUTTON_LABEL]: 'Wgraj demo',
    [ENavbarSectionKeys.ID_LEFT]: 'clearAll',
    [ENavbarSectionKeys.ID_RIGHT]: 'loadDemo',
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
