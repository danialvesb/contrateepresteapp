import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {server} from '../../common';
import ProgressOfWork from './ProgressOfWork';

const initialState = {
    data: null,
    access_token: ''
}
export default class ProgressOfWorks extends Component{
    state = {
        ...initialState
    }
    componentDidMount = async () => {
        await this.me()
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                {this.state.data &&
                this.state.data.map((item, index) => (
                        <ProgressOfWork key={item.id} data={item} endCalled={ (id)=> this.endCalled(id) } closeCalled={ (id) => this.closeCalled(id) }/>
                    )
                )
                }
            </ScrollView>
        )
    }
    async endCalled(id) {
        try {
            const access_token = await AsyncStorage.getItem('access_token')
            const responseRec = await axios({
                method: 'post',
                url: `${server}/services/offers/calleds/end/${id}`,
                headers: {
                    'Authorization': `bearer ${access_token}`
                },
                timeout: 5000
            })
            await this.me()
        }catch(err) {
            console.log(err)
        }
    }

    async closeCalled(id) {
        try {
            const access_token = await AsyncStorage.getItem('access_token')
            const responseRec = await axios({
                method: 'post',
                url: `${server}/services/offers/calleds/close/${id}`,
                headers: {
                    'Authorization': `bearer ${access_token}`
                },
                timeout: 5000
            })
            await this.me()
        }catch(err) {
            console.log(err)
        }
    }

    async me() {
        try {
            const access_token = await AsyncStorage.getItem('access_token')
            const responseRec = await axios({
                method: 'get',
                url: `${server}/services/offers/calleds/management`,
                headers: {
                    'Authorization': `bearer ${access_token}`
                },
                timeout: 5000
            })
            this.setState({data: responseRec.data, access_token: access_token})
        }catch(err) {
            console.log(err)
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
