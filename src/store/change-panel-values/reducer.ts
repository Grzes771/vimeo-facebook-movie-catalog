import { getType } from 'typesafe-actions';
import { Action } from '../types/actions';
import {
  setDisplayStarted,
  setFavoriteStarted,
  setOrderStarted,
} from './actions';

export type TSelectActionState = {
  display: 'tiles' | 'list';
  favorite: 'all' | 'favorite';
  orderBy: 'newest' | 'oldest';
};
export const initialState: TSelectActionState = {
  display: 'tiles',
  favorite: 'all',
  orderBy: 'newest',
};

export const inputValueChange = (
  state = initialState,
  action: Action
): TSelectActionState => {
  switch (action.type) {
    case getType(setDisplayStarted):
      return {
        ...state,
        display: action.payload.value,
      };

    case getType(setFavoriteStarted):
      return {
        ...state,
        favorite: action.payload.value,
      };
    case getType(setOrderStarted):
      return {
        ...state,
        orderBy: action.payload.value,
      };
    default:
      return { ...state };
  }
};
