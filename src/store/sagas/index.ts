import {call, fork, put, takeEvery} from 'redux-saga/effects'
import { IHotel } from '../../models/Hotel';
import { fetchHotels, requestHotelsAction } from '../actions/hotel';
import { HotelActionTypes } from '../reducers/hotel/types';

export function* fetchHotelsSaga({payload}: ReturnType<typeof requestHotelsAction>) {
    if(payload) {
        var {location, checkIn, dateCount} = payload 
    }
    try {
        const hotels: IHotel[] = yield call(fetchHotels, location, checkIn, dateCount)
        yield put({
            type: HotelActionTypes.FETCH_HOTELS_SUCCEEDED,
            payload: hotels
        })
    } catch (e) {
        yield put({
            type: HotelActionTypes.FETCH_HOTELS_FAILED,
            payload: "Произошла ошибка при загрузке списка отелей"
        })
    }
}

export function* watchFetchHotelsSaga() {
    yield takeEvery(HotelActionTypes.FETCH_HOTELS_REQUESTED, fetchHotelsSaga)
}

export default function* rootSaga() {
    yield fork(watchFetchHotelsSaga)
}