import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import WorksList from '../components/OffersList'
import Header from '../components/header/Header'

const { height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ height: height }}>
            <View style={styles.header}>
                <Header navigation={navigation}></Header>
            </View>

            <View style={styles.content}>
                <WorksList navigation={navigation}/>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
    },
    content: {
        marginBottom: 30,
        flex: 5,
    }
})
