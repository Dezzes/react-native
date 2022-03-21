
import React from 'react'
import { View } from 'react-native'
import HotelList from '../components/HotelList'
import { useAppSelector } from '../hooks/useTypedSelector'

const Suggestions: React.FC = () => {

    const {hotels} = useAppSelector(state => state.hotel)

	return (
		<View>
			<HotelList hotels={hotels}/>
		</View>
	)
}

export default Suggestions