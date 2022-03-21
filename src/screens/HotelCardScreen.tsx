import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackParams } from '../App';
import { addFavorite, fetchHotelImg, removeFavorite } from '../store/actions/hotel';
import Carousel from '../components/Carousel';
import { useAppSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';

type HotelCardScreenProps = NativeStackScreenProps<StackParams, "HotelCard">


const HotelCardScreen: React.FC<HotelCardScreenProps> = ({route}) => {
	const [starRating, setStarRating] = useState(route.params.hotel.stars)
	const {favorites} = useAppSelector(state => state.hotel)
	const [images, setImages] = useState<number[]>([])
	const [isFavorite, setIsFavorite] = useState(false)

	const dispatch = useDispatch()

	const fetchimg = async ()  => {
		const res = await fetchHotelImg(route.params.hotel.hotelId)
		setImages(res)
	}
	useEffect(() => {
		fetchimg()
	}, [])

	useEffect(() => {
		if(favorites.find((hotel) => hotel.hotelId === route.params.hotel.hotelId)) {
			setIsFavorite(true)
		} else {
			setIsFavorite(false)
		}
	}, [favorites])
	
	const navigation = useNavigation()

	const handlePressFavorite = () => {
		if(isFavorite) {
			dispatch(removeFavorite(route.params.hotel))
		} else {
			dispatch(addFavorite(route.params.hotel))
		}
	}

	return (
		<View style={styles.container}>
			<ImageBackground
				style={styles.headerCard}
				source={{uri: 'https://photo.hotellook.com/image_v2/limit/8184999263/800/520.auto'}}
				resizeMode='cover'
			>
				<View style={styles.headerBtns}>
					<Icon onPress={navigation.goBack} name='chevron-back' color='white' size={30}/>
					<Icon onPress={handlePressFavorite} name="heart" size={30} color={isFavorite ? 'red' : "#FFFFFF"} />
				</View>
				<View>
					<Text style={styles.headerText}>{route.params.hotel.hotelName}</Text>
					<View style={styles.stars}>
						<Icon style={{marginRight: 8}} name='star' size={20} color={starRating > 0 ? '#F3BE00' : '#FFFFFF'}/>
						<Icon style={{marginRight: 8}} name='star' size={20} color={starRating > 1 ? '#F3BE00' : '#FFFFFF'}/>
						<Icon style={{marginRight: 8}} name='star' size={20} color={starRating > 2 ? '#F3BE00' : '#FFFFFF'}/>
						<Icon style={{marginRight: 8}} name='star' size={20} color={starRating > 3 ? '#F3BE00' : '#FFFFFF'}/>
						<Icon style={{marginRight: 8}} name='star' size={20} color={starRating > 4 ? '#F3BE00' : '#FFFFFF'}/>
					</View>
				</View>
			</ImageBackground>	
			<View style={styles.hotelInfo}>
				<View style={styles.description}>
					<Image
						style={styles.descriptionImg}
						resizeMode='cover'
						source={{uri: 'https://photo.hotellook.com/image_v2/limit/7505804141/800/520.auto'}}
					/>
					<View style={{flex: 1}}>
						<Text style={styles.descriptionText}>Улучшенный номер с кроватью размера “queen - size”</Text>
						<View style={styles.peopleCountBlock}>
							<Icon name="people-outline" size={30} color="black"/>
							<Text style={styles.peopleCount}>2</Text>
						</View>
					</View>
				</View>
				<Text style={styles.carouselHeader}>Фото номера</Text>
				<View style={styles.carousel}>

					<Carousel idArr={images}/>
					
				</View>
				<Text style={styles.whatIncludeedText}>Что включено</Text>
				<Text style={styles.whatIncluded}>Завтрак</Text>
				<View style={styles.booking}>
					<View>
						<Text style={{color: '#878787'}}>Цена за все ночи:</Text>
						<Text style={{color: '#424242', fontSize: 17}}>{route.params.hotel.priceFrom}</Text>
					</View>
					<TouchableOpacity style={styles.bookingBtn}>
						<Text style={{color: 'white'}}>Забронировать</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
};

export default HotelCardScreen;

const styles = StyleSheet.create({
	container: {
		height: '100%',
		backgroundColor: '#E5E5E5'
	},
	headerCard: {
		backgroundColor: 'rgba(0, 0, 0, 1)',
		opacity: 0.8,
		justifyContent: 'space-between',
		height: 200,
		padding: 16,
	},
	headerText: {
		fontSize: 24,
		color: "#FFFFFF",
		fontFamily: 'GothamRegular',
	},
	stars: {
		flexDirection: 'row',
		marginTop: 12,

	},
	headerBtns: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20
	},
	hotelInfo: {
		padding: 16,
		marginTop: 10,
	},
	description: {
		flexDirection: 'row',
	},
	descriptionImg: {
		height: 70,
		width: 76,
		marginRight: 9,
		borderRadius: 10
	},
	descriptionText: {
		color: 'black',
		fontSize: 14,
		fontFamily: 'GothamRegular'
	},
	peopleCountBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 6
	},
	peopleCount: {
		color: 'black',
		fontFamily: 'GothamRegular',
		marginLeft: 5,
	},
	carouselHeader: {
		fontFamily: 'GothamRegular',
		color: 'black',
		fontSize: 14,
		marginTop: 24,
	},
	carousel: {
		marginTop: 8
	},
	whatIncludeedText: {
		fontFamily: 'GothamRegular',
		color: 'black',
		fontSize: 14,
		marginTop: 24
	},
	whatIncluded: {
		width: 90,
		height: 25,
		marginTop: 8,
		borderRadius: 4,
		paddingHorizontal: 23,
		paddingVertical: 5,
		color: '#6AAF75',
		backgroundColor: 'rgba(106, 175, 117, 0.2)',
		fontFamily: 'GothamRegular',
		fontSize: 10,
		flexGrow: 0
	},
	booking: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#FFFFFF',
		padding: 16,
		marginTop: 24,
		borderRadius: 16
	},
	bookingBtn: {
		backgroundColor: '#5AC8FA',
		borderRadius: 10,
		paddingVertical: 12,
		paddingHorizontal: 24,
	}
})