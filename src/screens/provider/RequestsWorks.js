import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import RequestWork from './RequestWork';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {server} from '../../common';

const initialState = {
    data: null
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
                        <RequestWork key={item.id} data={item}/>
                        )
                    )
                }
            </ScrollView>
        )
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
            this.setState({data: responseRec.data})
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
