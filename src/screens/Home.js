import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'

import Filters from '../components/Filters';
import OfferWorkList from '../components/OfferWorkList';

export default class Home extends Component {
    render() {
        return (

            <View style={styles.home}>
                <View>
                    <Header
                        placement="left"
                        leftComponent={{ icon: 'menu', color: '#fff' }}
                        centerComponent={{ text: 'Contrate Online', style: { color: '#fff' } }}
                        rightComponent={{ icon: 'home', color: '#fff' }}
                    />
                </View>

                <View style={styles.header}>
                    <Filters />
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
        flex: 10,
    }

})
