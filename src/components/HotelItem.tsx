import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { useAppSelector } from '../hooks/useTypedSelector';
import { IHotel } from '../models/Hotel';


interface HotelItemProps {
    hotel: IHotel
}

const HotelItem: React.FC<HotelItemProps> = ({ hotel }) => {

    const {favorites} = useAppSelector(state => state.hotel)

    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
		if(favorites.find((favHotel) => favHotel.hotelId === hotel.hotelId)) {
			setIsFavorite(true)
		} else {
			setIsFavorite(false)
		}
	}, [favorites])

    const navigation = useNavigation()
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('HotelCard', {hotel})}
        >
                <View style={styles.mainBlock}>
                    <View style={styles.imgContainer}>
                        <Image
                            style={{ width: 57, height: 57, borderRadius: 100 }}
                            source={{
                                uri: 'https://photo.hotellook.com/image_v2/limit/5162091534/57/57.auto'
                            }}
                        />
                    </View>
                    <View style={styles.hotelInfo}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>
                                {hotel.hotelName}
                            </Text>
                            <Icon name="heart" size={24} color={isFavorite ? "red" : "#C4C4C4"} />
                        </View>
                        <View style={styles.starSection}>
                            <View style={styles.stars}>
                                <Icon style={styles.star} name='star' size={14} color={hotel.stars > 0 ? '#F3BE00' : '#323232'}/>
                                <Icon style={styles.star} name='star' size={14} color={hotel.stars > 1 ? '#F3BE00' : '#323232'}/>
                                <Icon style={styles.star} name='star' size={14} color={hotel.stars > 2 ? '#F3BE00' : '#323232'}/>
                                <Icon style={styles.star} name='star' size={14} color={hotel.stars > 3 ? '#F3BE00' : '#323232'}/>
                                <Icon style={styles.star} name='star' size={14} color={hotel.stars > 4 ? '#F3BE00' : '#323232'}/>
                            </View>
                            <Text style={styles.rooms}>Осталось 3 комнаты</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.underLine}></Text>
                <View style={styles.priceBlock}>
                    <Text style={styles.priceText}>Цена за все ночи:</Text>
                    <Text style={styles.price}>{hotel.priceFrom}₽</Text>
                </View>
        </TouchableOpacity>

    )
}

export default HotelItem


const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        marginHorizontal: 16,
        padding: 16,
        backgroundColor: "#FFFFFF",
        borderRadius: 16
    },
    mainBlock: {
        flexDirection: 'row',
    },
    imgContainer: {
        width: 57,
        height: 57,
        backgroundColor: '#41522E0D',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        marginRight: 12,
        borderRadius: 100
    },
    header: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    headerText: {
        fontFamily: 'GothamMedium',
        fontSize: 15,
        marginRight: 5,
        flex: 1
    },
    hotelInfo: {
        flex: 1
    },
    starSection: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stars: {
        flexDirection: "row",
        marginRight: 5
    },
    star: {
        marginRight: 5
    },
    rooms: {
        color: '#878787'
    },
    underLine: {
        marginVertical: 8,
        height: 2,
        width: "100%",
        backgroundColor: "#F4F4F4"
    },
    priceBlock: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    priceText: {
        fontFamily: 'GothamBook',
        fontSize: 13,
        color: '#878787',
        alignSelf: 'center',
        marginRight: 10
    },
    price: {
        fontFamily: 'GothamMedium',
        fontSize: 16,
    }
})