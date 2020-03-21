import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import OfferWorkList from '../components/OfferWorkList';
import Header from '../components/header/Header';

export default function HomeScreen({ navigation }) {
        return (
            <View style={styles.home}>
                <View style={styles.header}>
                    <Header navigate={navigation}></Header>
                </View>

                <View style={styles.content}>
                    <OfferWorkList  />
                </View>

            </View>
        )
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        flex: 2,
    },
    content: {
        flex: 10,
    }

})
