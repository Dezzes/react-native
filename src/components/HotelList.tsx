import React from 'react'
import { FlatList } from 'react-native'
import { IHotel } from '../models/Hotel';
import HotelItem from './HotelItem';

interface HotelListProps {
    hotels: IHotel[],

}
const HotelList: React.FC<HotelListProps> = ({ hotels }) => {
    return (
        <FlatList
            data={hotels}
            renderItem={({ item }) => (
                <HotelItem hotel={item} />
            )}
        />
    )
}

export default HotelList