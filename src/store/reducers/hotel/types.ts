import { IHotel, IRequestHotel } from "../../../models/Hotel"

export enum HotelActionTypes {
    FETCH_HOTELS_REQUESTED = "FETCH_HOTELS_REQUESTED",
    FETCH_HOTELS_SUCCEEDED = "FETCH_HOTELS_SUCCEEDED",
    FETCH_HOTELS_FAILED = "FETCH_HOTELS_FAILED",
    ADD_FAVORITE = "ADD_FAVORITE",
    REMOVE_FAVORITE = "REMOVE_FAVORITE"
}

export interface FetchHotelsRequested {
    type: HotelActionTypes.FETCH_HOTELS_REQUESTED,
    payload?: IRequestHotel
}

export interface FetchHotelsSucceeded {
    type: HotelActionTypes.FETCH_HOTELS_SUCCEEDED,
    payload: IHotel[]
}

export interface FetchHotelsFailed {
    type: HotelActionTypes.FETCH_HOTELS_FAILED,
    payload: string
}

export interface AddFavorite {
    type: HotelActionTypes.ADD_FAVORITE,
    payload: IHotel
}


export interface RemoveFavorite {
    type: HotelActionTypes.REMOVE_FAVORITE,
    payload: IHotel
}

export type HotelActions = 
    FetchHotelsRequested |
    FetchHotelsSucceeded |
    FetchHotelsFailed |
    AddFavorite |
    RemoveFavorite


export interface HotelState {
    hotels: IHotel[],
    favorites: IHotel[],
    loading: boolean,
    error: string
}