import React, { Component } from 'react'
import { View, StyleSheet, ScrollView} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'

import OfferWork from './OfferWork'

export default class OfferWorkList extends Component {
    render() {

        return (
            <View style={styles.container}>

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
    scrollview: {
        flex: 5
    },
    taskList: {
        flex: 5
    },
})
