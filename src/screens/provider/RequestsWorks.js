import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import RequestWork from './RequestWork';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {server} from '../../common';

const initialState = {
    data: null,
    access_token: ''
}
export default class RequestsWorks extends Component{
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
                        <RequestWork key={item.id} data={item} accept={(id)=> this.acceptRequestWork(id)} refuse={(id) => this.refuseRequestWork(id)}/>
                        )
                    )
                }
            </ScrollView>
        )
    }
    acceptRequestWork = async (idCalled) => {
        try {
            const responseRec = await axios({
                method: 'post',
                url: `${server}/services/offers/calleds/accept/${idCalled}`,
                headers: {
                    'Authorization': `bearer ${this.state.access_token}`
                },
            })
            await this.me()
        }catch(err) {
            console.log(err)
        }
    }
    refuseRequestWork = async (idCalled) => {
        try {
            const responseRec = await axios({
                method: 'post',
                url: `${server}/services/offers/calleds/refuse/${idCalled}`,
                headers: {
                    'Authorization': `bearer ${this.state.access_token}`
                },
                data: {

                }
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
