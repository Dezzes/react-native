import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import Header from '../components/Header'
import HotelList from '../components/HotelList'
import HotelSearch from '../components/HotelSearch'
import { useAppSelector} from '../hooks/useTypedSelector'
import { requestHotelsAction } from '../store/actions/hotel'

const HomeScreen: React.FC = () => {

    const { hotels } = useAppSelector(state => state.hotel)
    const dispatch = useDispatch()
    const navigate = useNavigation()

	useEffect(() => {
		dispatch(requestHotelsAction())
	}, [])

    return (
        <View style={styles.container}>
            <Header/>
            <HotelSearch />
            <HotelList hotels={hotels} />
            <StatusBar translucent  backgroundColor="transparent"/>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
	container: {
		height: "100%",
		backgroundColor: "#E5E5E5"
	}
});
