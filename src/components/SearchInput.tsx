import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { IRequestHotel } from '../models/Hotel'
import { formatDateForUser } from '../utils/date'

interface SearchInputProps {
	setShowSearch: React.Dispatch<React.SetStateAction<boolean>>,
	search: IRequestHotel
} 

const SearchInput: React.FC<SearchInputProps> = ({setShowSearch, search}) => {

	return (
		<TouchableOpacity
		onPress={() => setShowSearch(true)}
		style={styles.container}
		>
			<Text>{search.location} {formatDateForUser(search.checkIn)} {search.dateCount} ночь</Text>
		</TouchableOpacity>
	)
}

export default SearchInput

const styles = StyleSheet.create({
	container: {
		marginVertical: 40,
		marginHorizontal: 25,
		padding: 15,
		borderWidth: 1,
		borderColor: '#5AC8FA',
		borderRadius: 10,
		backgroundColor: 'white'
	},
	input: {
		padding: 10
	}
})