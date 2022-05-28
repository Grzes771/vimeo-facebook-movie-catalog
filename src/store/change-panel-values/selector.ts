import { AppState } from '../reducers';
import { TSelectActionState } from './reducer';

export const setInputDataRX = (state: AppState): TSelectActionState =>
  state.inputValueChange;
