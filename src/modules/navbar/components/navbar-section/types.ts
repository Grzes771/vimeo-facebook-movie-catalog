import { TIdsValues } from 'types/video-list-context-enums';

export enum ENavbarSectionKeys {
  LABEL = 'label',
  LEFT_BUTTON_LABEL = 'leftButtonLabel',
  RIGHT_BUTTON_LABEL = 'rightButtonLabel',
  BUTTON_ON_CLICK = 'buttonOnClick',
  ID_LEFT = 'idLeft',
  ID_RIGHT = 'idRight',
  BUTTON_IS_ACTIVE = 'buttonIsActive',
}

export type TNavbarSection = {
  [ENavbarSectionKeys.LABEL]: string;
  [ENavbarSectionKeys.LEFT_BUTTON_LABEL]: string;
  [ENavbarSectionKeys.RIGHT_BUTTON_LABEL]: string;
  [ENavbarSectionKeys.ID_LEFT]: TIdsValues;
  [ENavbarSectionKeys.ID_RIGHT]: TIdsValues;
  [ENavbarSectionKeys.BUTTON_IS_ACTIVE]: (id: string) => boolean | undefined;
  [ENavbarSectionKeys.BUTTON_ON_CLICK]: (id: TIdsValues) => void;
};
