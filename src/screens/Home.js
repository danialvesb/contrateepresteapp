import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import Header from '../components/Header';
import OfferWorkList from '../components/OfferWorkList';

export default class Home extends Component {
    render() {
        return (
            <View style={styles.home}>
                <View style={styles.header}>
                    <Header  />
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
        flex: 1,
    },
    content: {
        flex: 5,
    }

})
