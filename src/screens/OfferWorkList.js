import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, ScrollView} from 'react-native'

import todayImage from '../../assets/imgs/today.jpg'

import commonStyles from '../commonStyles'
import moment from 'moment'
import 'moment/locale/pt-br'

import OfferWork from '../components/OfferWork'

export default class OfferWorkList extends Component {
    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style={styles.container}>
                <ImageBackground source={todayImage} style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Menu</Text>
                        <Text style={styles.subtitle}> { today } </Text>
                    </View>
                </ImageBackground >
                <View style={styles.scrollview}>
                    <ScrollView >
                        <OfferWork name='Daniel Alves Bezerra'
                                   locale='Goiânia/GO'
                                   district='Parque Tremendão'
                                   rating='4,5'
                                   typeOffer='Pintura'/>
                        <OfferWork name='Daniel Alves Bezerra'
                                   locale='Goiânia/GO'
                                   district='Parque Tremendão'
                                   rating='4,5'
                                   typeOffer='Pintura'/>
                        <OfferWork name='Daniel Alves Bezerra'
                                   locale='Goiânia/GO'
                                   district='Parque Tremendão'
                                   rating='4,5'
                                   typeOffer='Pintura'/>
                    </ScrollView>
                </View>



            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 1
    },
    scrollview: {
        flex: 5
    },
    taskList: {
        flex: 5
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: commonStyles.colors.secondary,
        marginLeft: 15,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 10,
        marginBottom: 10

    }
})
