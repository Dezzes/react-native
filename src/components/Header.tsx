import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

const Header = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Simple Hotel Check</Text>
            <Icon name="logout" size={24} color="black" />
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        fontFamily: 'GothamBold',
        fontSize: 24
    }
});