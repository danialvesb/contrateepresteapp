import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native';
import Work from '../../components/Offer';

export default props => {
    return (
        <View style={styles.containerStyle}>
            <View style={styles.offferStyles}>

            </View>
            <View style={styles.serviceStyle}>

            </View>
            <View style={styles.categoryStyle}>

            </View>
            <View style={styles.offerDetailsStyles}>

            </View>
            <View style={styles.statusSolicitation}>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'rgba(249,249,249,0.55)',
        width: '100%',
        height: '100%'
    },
    offferStyles: {

    },
    serviceStyle: {

    },
    categoryStyle: {

    },
    offerDetailsStyles: {

    },
    statusSolicitation: {

    }
})
