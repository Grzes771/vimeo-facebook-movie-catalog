import { AppState } from "../../store/reducers";
import { TVideosArrItem } from "../types/movie-item";

export const vimeoVideosDataRX = (state:AppState): TVideosArrItem[]  => state.getVimeoVideos.vimeoVideos