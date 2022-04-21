import { createAction } from 'typesafe-actions';
import { SET_DISPLAY, SET_FAVORITE, SET_ORDER } from './consts';

export const setDisplayStarted = createAction(SET_DISPLAY, (value: string) => ({
    value,
}))()
export const setFavoriteStarted = createAction(SET_FAVORITE, (value: string) => ({
    value,
}))()
export const setOrderStarted = createAction(SET_ORDER, (value: string) => ({
    value,
}))()