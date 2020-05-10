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
                        <ProgressOfWork key={item.id} data={item} endService={ (id)=> this.endService(id) } closeCalled={ (id) => this.closeCalled(id) }/>
                    )
                )
                }
            </ScrollView>
        )
    }
    async endService(id) {

    }

    async closeCalled(id) {

    }

    async me() {
        try {
            const access_token = await AsyncStorage.getItem('access_token')
            const responseRec = await axios({
                method: 'get',
                url: `${server}/services/offers/calleds`,
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
