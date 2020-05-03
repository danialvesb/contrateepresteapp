import React, { Component } from 'react'
import {ScrollView, View, StyleSheet} from 'react-native';
import Solicitation from './Solicitation';


const initialState = {
    me: {},
    modalVisible: false,
    status: "pending",
    message: 'Descrição aqui',
    owner_id: '',
    offer_id: '',
    files: "/"

}

export default class Solicitations extends Component {
    state = {
        ...initialState
    }
    render() {
        return (
            <View style={styles.container}>
                <View  style={styles.scrollview}>
                    <ScrollView>
                        <Solicitation></Solicitation>
                        <Solicitation></Solicitation>
                        <Solicitation></Solicitation>
                        <Solicitation></Solicitation>
                        <Solicitation></Solicitation>
                        <Solicitation></Solicitation>
                        <Solicitation></Solicitation>
                        <Solicitation></Solicitation>
                    </ScrollView>
                </View>

            </View>

        )
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
