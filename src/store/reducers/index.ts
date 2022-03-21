import { combineReducers } from "redux";
import { hotelReducer } from './hotel/hotelReducer';

export const rootReducer = combineReducers({
    hotel: hotelReducer
})