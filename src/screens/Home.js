import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import OfferWorkList from '../components/OfferWorkList';
import Header from '../components/header/Header';
import {Dimensions} from 'react-native';

const { height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
        return (
            <View style={{ height: height }}>
                <View style={styles.header}>
                    <Header navigation={navigation}></Header>
                </View>

                <View style={styles.content}>
                    <OfferWorkList  navigation={navigation}/>
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
