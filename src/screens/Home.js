import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Header from '../components/header/Header'
import axios from 'axios'
import {server, showError} from '../common'
import OffersList from '../components/OffersList';
import { createFilter } from 'react-native-search-filter';

const { height } = Dimensions.get('window')
const initialState = {
    offersData: [],
    categoriesData: [],
    spinner: true,
    refreshing: false,
    setRefreshing: 0,
    textSearchValue: '',
    selectedValueCategory: 0
}
export default class Home extends React.Component{
    state = {
        ...initialState
    }

    componentDidMount = async () => {
        await this.getData()
    }

    getData = async () => {
        await this.getCategories()
        await axios.get(`${server}/services/offers/`)
            .then( resp => {

                if (resp.data){
                    this.setState({ offersData: resp.data, spinner: false})
                    return true
                }
            }).catch( () => {
                this.setState({offersData: false, spinner: false})
                showError('Não foi possível ofertas')
                return false
            })
    }

    getCategories = async () => {
        await axios.get(`${server}/services/categories`)
            .then( resp => {
                if (resp.data){
                    this.setState({ categoriesData: resp.data})
                }
            }).catch( () => {
                this.setState({categoriesData: 0})
                showError('Não foi possível carregar filtros')
            })
    }

    onRefresh = async () => {
        this.setState({refreshing: true})
        await this.getData()
        this.setState({refreshing: false})
    }

    filterListPerText(value) {
        this.setState({textSearchValue: value})
    }
    setSelectedValueCategory(value) {
        this.setState({selectedValueCategory: value})
    }

    render() {
        let offersDataNew

        offersDataNew = this.state.offersData.filter(createFilter(this.state.textSearchValue, ['service_title']))

        if (this.state.selectedValueCategory > 1) {
            offersDataNew = this.state.offersData.filter(createFilter(this.state.selectedValueCategory.toString(), ['category_id']))
        }

        return (
            <View style={{ height: height }}>
                <View style={styles.header}>
                    <Header filterListPerText={(value) => this.filterListPerText(value)}
                        textSearchValue={this.state.textSearchValue}
                        navigation={this.props.navigation}
                        categoriesData={this.state.categoriesData}
                        selectedValueCategory={this.state.selectedValueCategory}
                        setSelectedValueCategory={(itemValue) => this.setSelectedValueCategory(itemValue)}/>
                </View>

                <View style={styles.content}>
                    <OffersList
                        offersData={offersDataNew}
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
        backgroundColor:'rgba(66,75,255,0.06)'
    },
    content: {
        marginBottom: 5,
        flex: 5,
        backgroundColor:'rgba(66,75,255,0.06)'
    }
})
