import React, { Component } from 'react'
import { View, StyleSheet, ScrollView} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay'
import OfferWork from './OfferWork'
import axios from 'axios'
import {server, showError, showSuccess} from '../common'

const initialState = {
    offersData: [],
    spinner: false
}

export  default class OfferWorkList extends Component {
    componentDidMount = async () => {

        setTimeout(() => {
            let resp = this.getData()
            if (resp)
                this.setState({
                    spinner: !this.state.spinner,
                });
        }, 5000);

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
                {/*<Spinner*/}
                {/*    visible={this.state.spinner}*/}
                {/*    textStyle={styles.spinnerTextStyle}*/}
                {/*/>*/}
                <View style={styles.scrollview}>
                    <ScrollView >
                        {
                            this.state.offersData.map((item, index) => (
                                <OfferWork key={item.id}
                                    name={item.name}
                                    navigation={this.props.navigation}
                                    locale={`${item.city} / ${ item.uf}`}
                                    district={item.district}
                                    rating={item.rating}
                                    typeOffer={item.service_title}
                                    data={item}/>
                            ))
                        }

                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
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
