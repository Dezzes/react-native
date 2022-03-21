import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native'
import {formatDateForUser} from "../utils/date";
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons'
import { IRequestHotel } from '../models/Hotel';
import { requestHotelsAction } from '../store/actions/hotel';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

interface HotelSearchProps {
    setShowSearch?: React.Dispatch<React.SetStateAction<boolean>>
    setSearch?: React.Dispatch<React.SetStateAction<IRequestHotel>>
}

const HotelSearch: React.FC<HotelSearchProps> = ({setShowSearch, setSearch}) => {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [searchParams, setSearchParams] = useState<IRequestHotel>({
        location: 'Москва',
        checkIn: new Date(),
        dateCount: '1'
    })
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleChange = (event: Event, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || searchParams.checkIn // if date is not selected - choose default date
        setShowDatePicker(false)
        setSearchParams({...searchParams, checkIn: currentDate});

    };
    
    const handleSubmit = () => {
        dispatch(requestHotelsAction(searchParams))
        if(setShowSearch) {
            setShowSearch(false)
        }
        if(setSearch) {
            setSearch(searchParams)
        }
        navigation.navigate("Suggestions", {searchParams})
    }
    const handleCheckOutDate = (newDateCount: string) => {
        setSearchParams({...searchParams, dateCount: newDateCount})
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Куда Едем</Text>
            <TextInput
                value={searchParams.location}
                onChangeText={(newLocation) => setSearchParams({...searchParams, location: newLocation})}
                style={styles.cityInput}
                placeholder='Локация'
            />
            <View style={styles.pickers}>
                <TouchableOpacity
                    style={styles.datePicker}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text>{formatDateForUser(searchParams.checkIn)}</Text>
                    <Icon name="calendar-outline" size={24} color="#5AC8FA" />
                </TouchableOpacity>
                <View style={styles.dateCount}>
                    <TextInput
                        keyboardType="numeric"
                        onChangeText={handleCheckOutDate}
                        style={styles.textInput}
                        defaultValue='1'
                        placeholder='Кол-во дней'
                    />
                    <Icon name="time-outline" size={24} color="#5AC8FA" />
                </View>
            </View>
            <TouchableOpacity
                onPress={handleSubmit}
                style={styles.searchBtn}>
                <Text style={styles.searchBtnText}>Найти</Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={searchParams.checkIn}
                    onChange={handleChange}
                />
            )}
        </View>
    )
}
export default HotelSearch

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        marginTop: 24,
        margin: 16,
        borderRadius: 25
    },
    pickers: {
        flexDirection: 'row',
        marginVertical: 16,
    },
    header: {
        fontFamily: 'GothamBold',
        fontSize: 18
    },
    cityInput: {
        borderColor: '#5AC8FA',
        borderRadius: 10,
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginTop: 16
    },
    datePicker: {
        borderColor: '#5AC8FA',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginRight: 10,
        flex: 1
    },
    dateCount: {
        borderColor: '#5AC8FA',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 10,
        flex: 1,
    },
    textInput: {
        width: "80%"
    },
    searchBtn: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        padding: 12.5,
        backgroundColor: '#5AC8FA',
        borderRadius: 10,
    },
    searchBtnText: {
        color: "#FFFFFF",
        fontFamily: "GothamMedium",
        fontSize: 16,
    }
});