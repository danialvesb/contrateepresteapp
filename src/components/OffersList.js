import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, RefreshControl} from 'react-native'
import 'moment/locale/pt-br'
import Spinner from 'react-native-loading-spinner-overlay'
import Offer from './Offer'
import axios from 'axios'
import {server, showError} from '../common'

const initialState = {
    offersData: null,
    spinner: true,
    refreshing: false,
    setRefreshing: 0
}

export  default class OffersList extends Component {
    state = {
        ...initialState
    }

    componentDidMount = async () => {
        await this.getData()
    }

    getData = async () => {
        await axios.get(`${server}/services/offers/`)
            .then( resp => {
                if (resp.data){
                    this.setState({ offersData: resp.data, spinner: false})

                    return true
                }
            }).catch( () => {
                this.setState({offersData: false, spinner: false})
                showError(err)
                return false
            })
    }
    onRefresh = async () => {
        this.setState({refreshing: true})
        await this.getData()
        this.setState({refreshing: false})

    }

    render() {
        return (
            <View style={styles.container}>
                <Spinner
                    visible={this.state.spinner}
                    textStyle={styles.spinnerTextStyle}
                />
                <View style={styles.scrollview}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />
                        }>
                        {this.state.offersData &&
                            this.state.offersData.map((item, index) => (
                                <Offer key={item.id}
                                    name={item.name}
                                    navigation={this.props.navigation}
                                    locale={`${item.city} / ${item.uf}`}
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
