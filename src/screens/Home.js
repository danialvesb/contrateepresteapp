import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Header from '../components/header/Header'
import axios from 'axios'
import {server, showError} from '../common'
import OffersList from '../components/OffersList';

const { height } = Dimensions.get('window')
const initialState = {
    offersData: null,
    spinner: true,
    refreshing: false,
    setRefreshing: 0,
    textSearchValue: ''
}
export default class Home extends React.Component{
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

    filterListPerText(value) {
        this.setState({textSearchValue: value})
        const offersDataNew = this.state.offersData.filter( item => {
            return item.service_title === value
        })
        this.setState({offersData: offersDataNew})
    }


    render() {
        return (
            <View style={{ height: height }}>
                <View style={styles.header}>
                    <Header filterListPerText={(value) => this.filterListPerText(value)}
                        textSearchValue={this.state.textSearchValue}
                        navigation={this.props.navigation}/>
                </View>

                <View style={styles.content}>
                    <OffersList
                        offersData={this.state.offersData}
                        spinner={this.state.spinner}
                        refreshing={ () => this.onRefresh() }
                        refreshingState={this.state.refreshing}
                        navigation={this.props.navigation}/>
                </View>
            </View>
        )
    }
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
