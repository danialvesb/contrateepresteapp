import React, { Component } from 'react'
import {ScrollView, View, StyleSheet} from 'react-native';
import Solicitation from './Solicitation';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {server} from '../../common';

const initialState = {
    me: {},
    data: null
}

export default class Solicitations extends Component {
    state = {
        ...initialState
    }
    componentDidMount = async () => {
        await this.loadData()
    }

    render() {
        return (
            <View style={styles.container}>
                <View  style={styles.scrollview}>
                    <ScrollView>
                        {this.state.data &&
                            this.state.data.map((item, index) => (
                                    <Solicitation key={item.id} data={item}/>
                                )
                            )

                        }

                    </ScrollView>
                </View>
            </View>
        )
    }
    async loadData() {
        const access_token = await AsyncStorage.getItem('access_token')
        const responseRec = await axios({
            method: 'get',
            url: `${server}/services/offers/solicitations`,
            headers: {
                'Authorization': `bearer ${access_token}`
            },
        })
        if (responseRec.data.status !== "Token is Expired") {
            this.setState({data: responseRec.data})
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollview: {
        flex: 1
    },
})
