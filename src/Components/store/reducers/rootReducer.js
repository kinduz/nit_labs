import { combineReducers } from "redux";
import { gamesReducer } from '../reducers/gamesReducer'
import { filtersReducer } from "./filtersReducer";

export const rootReducer = combineReducers({
    games: gamesReducer,
    filters: filtersReducer,
})