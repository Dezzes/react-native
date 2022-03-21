import { HotelState, HotelActionTypes, HotelActions } from './types';

const initialState: HotelState = {
    hotels: [],
    favorites: [],
    loading: false,
    error: '',
}

export const hotelReducer = (state = initialState, action: HotelActions): HotelState => {
    switch (action.type) {
        case HotelActionTypes.FETCH_HOTELS_REQUESTED:
            return {...state, hotels: [], loading: true}
        case HotelActionTypes.FETCH_HOTELS_SUCCEEDED:
            return {...state, hotels: action.payload, loading: false}
        case HotelActionTypes.FETCH_HOTELS_FAILED:
            return {...state, hotels: [], loading: false, error: action.payload}
        case HotelActionTypes.ADD_FAVORITE:
            return {...state, favorites: [...state.favorites, action.payload]}
        case HotelActionTypes.REMOVE_FAVORITE:
            return {...state, favorites: [...state.favorites].filter(hotel => hotel.hotelId !== action.payload.hotelId)}
        default:
            return state
    }
}