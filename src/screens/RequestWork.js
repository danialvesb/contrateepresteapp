import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import HeaderRequestWork from '../components/header/HeaderRequestWork';

export  default props => {
    return (
        <View style={ styles.container }>
            <HeaderRequestWork></HeaderRequestWork>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
