import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAppSelector } from '../hooks/useTypedSelector'
import HotelList from './HotelList'
import Icon from 'react-native-vector-icons/Entypo'
import { IHotel } from '../models/Hotel'

const Favorites: React.FC = () => {

	const {favorites} = useAppSelector(state => state.hotel)

	const [selectedSort, setSelectedSort] = useState("price")
	const [sortedFavorites, setSortedFavorites] = useState<IHotel[]>(favorites)

	useEffect(() => {
		sortFavorites()
	}, [selectedSort])

	const sortFavorites = () => {
		if(selectedSort === "price") {
			setSortedFavorites([...favorites].sort((a, b) => a.priceFrom - b.priceFrom))
		} else {
			setSortedFavorites([...favorites].sort((a, b) => a.stars - b.stars))
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.sortBlock}>
				<Text style={styles.sortBy}>Сортировать по:</Text>
				<View style={styles.sorts}>
					<TouchableOpacity onPress={() => setSelectedSort("rating")} style={styles.sort}>
						<Text style={styles.sortText}>Рейтинг</Text>
						<Icon name="select-arrows"/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setSelectedSort("price")} style={styles.sort}>
						<Text style={[styles.sortText]}>Цена</Text>
						<Icon name="select-arrows"/>
					</TouchableOpacity>
				</View>
			</View>
			<HotelList hotels={sortedFavorites}/>
		</View>
	)
}

export default Favorites


const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		marginHorizontal: 16
	},
	sortBlock: {
		marginVertical: 10,
		marginHorizontal: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	sortBy: {
		fontFamily: 'GothamRegular',
		fontSize: 14
	},
	sorts: {
		flexDirection: 'row'
	},
	sort: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#5AC8FA',
		marginRight: 6,
		padding: 5,
		borderRadius: 10
	},
	sortText: {
		marginRight: 5,
	}
})