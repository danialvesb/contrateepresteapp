import React, { Component } from 'react'
import { View, StyleSheet, ScrollView} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import AsyncStorage from '@react-native-community/async-storage';

import OfferWork from './OfferWork'
import axios from 'axios';
import {server, showError, showSuccess} from '../common';

const initialState = {
    offersData: []
}

export  default class OfferWorkList extends Component {
    componentDidMount = async () => {
        this.getData()

    }
    state = {
        ...initialState
    }

    getData = async () => {
        try {
            const resp = await axios.get(`${server}/services/offers/`)
            this.setState({ offersData: resp.data })
        } catch(err) {
            showError(err)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.scrollview}>
                    <ScrollView >
                        {
                            this.state.offersData.map((item, index) => (
                                <OfferWork name={item.name}
                                    navigation={this.props.navigation}
                                    locale={`${item.city} / ${ item.uf}`}
                                    district={item.district}
                                    rating={item.rating}
                                    typeOffer={item.title}/>
                            ))
                        }


                    </ScrollView>
                </View>
            </View>
        )
    }
}
// export  default  function OfferWorkList({ navigation }) {
//     return (
//         <View style={styles.container}>
//             <View style={styles.scrollview}>
//                 <ScrollView >
//                     <OfferWork name='Daniel Alves Bezerra'
//                                navigation={navigation}
//                                locale='Goiânia/GO'
//                                district='Parque Tremendão'
//                                rating='4,5'
//                                typeOffer='Pintura'/>
//                     <OfferWork name='Daniel Alves Bezerra'
//                                navigation={navigation}
//                                locale='Goiânia/GO'
//                                district='Parque Tremendão'
//                                rating='4,5'
//                                typeOffer='Pintura'/>
//                     <OfferWork name='Daniel Alves Bezerra'
//                                navigation={navigation}
//                                locale='Goiânia/GO'
//                                district='Parque Tremendão'
//                                rating='4,5'
//                                typeOffer='Pintura'/>
//                     <OfferWork name='Daniel Alves Bezerra'
//                                navigation={navigation}
//                                locale='Goiânia/GO'
//                                district='Parque Tremendão'
//                                rating='4,5'
//                                typeOffer='Pintura'/>
//                     <OfferWork name='Daniel Alves Bezerra'
//                                navigation={navigation}
//                                locale='Goiânia/GO'
//                                district='Parque Tremendão'
//                                rating='4,5'
//                                typeOffer='Pintura'/>
//                 </ScrollView>
//             </View>
//         </View>
//     )
// }

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
