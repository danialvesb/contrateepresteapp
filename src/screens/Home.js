import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import OfferWorkList from '../components/OfferWorkList';
import Header from '../components/header/Header';

export default class Home extends Component {
    render() {
        return (
            <View style={styles.home}>
                <View style={styles.header}>
                    <Header></Header>
                </View>


                <View style={styles.content}>
                    <OfferWorkList  />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        flex: 3,
    },
    content: {
        flex: 10,
    }

})
