import axios from "axios";
import hotellook from "../../api/hotellook";
import { IHotel, IRequestHotel } from "../../models/Hotel";
import { getCheckoutDate, formatDateForServer } from "../../utils/date";
import { HotelActionTypes } from "../reducers/hotel/types";

export const fetchHotels = async (location: string = 'Москва', checkIn: Date = new Date(), dateCount: string = "1"): Promise<IHotel[]> => {
    const checkOut = getCheckoutDate(checkIn, dateCount)

    const response = await hotellook.get("/cache.json", {
        params: {
            location,
            checkIn: formatDateForServer(checkIn),
            checkOut: formatDateForServer(checkOut),
            currency: 'rub'
        }
    })
    return response.data
}

export const fetchHotelImg = async (hotelId: number):  Promise<number[]> => {
    const response = await axios.get(`https://yasen.hotellook.com/photos/hotel_photos`, {
        params: {
            id: hotelId
        }
    })
    return response.data[hotelId]

}

export const requestHotelsAction = ((payload?: IRequestHotel) => ({type: HotelActionTypes.FETCH_HOTELS_REQUESTED, payload}))
export const addFavorite = ((payload: IHotel) => ({type: HotelActionTypes.ADD_FAVORITE, payload}))
export const removeFavorite = ((payload: IHotel) => ({type: HotelActionTypes.REMOVE_FAVORITE, payload}))