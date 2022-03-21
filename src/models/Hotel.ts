export interface ILocation {
    lat: number,
    lon: number
}

export interface IHotel {
    hotelId: number,
    hotelName: string,
    location: ILocation,
    locationId: number,
    priceAvg: number,
    priceFrom: number,
    pricePercentile: object,
    stars: number
}

export interface IRequestHotel {
    location: string
    checkIn: Date
    dateCount: string
}