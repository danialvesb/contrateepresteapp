import {Text, TouchableOpacity, View, StyleSheet, Dimensions} from 'react-native'
import {Avatar} from 'react-native-paper'
import React, { Component } from 'react'

const initialState = {
    selected: false
}

export  default class CardService extends Component{
    state = {
        ...initialState
    }
    render() {
        return (
            <TouchableOpacity style={[this.props.selectedServiceId == this.props.data.id ? styles.serviceSelected : styles.service]} onPress={() => { this.props.setSelect() }}>
                <View>
                    <Avatar.Image
                        source={{uri: `http://192.168.3.103:8000/api/services/_image/services/${this.props.data.image_path}`}}
                        size={80}/>
                </View>
                <View>
                    <Text style={[this.props.selectedServiceId == this.props.data.id ? styles.colorWhite : styles.colorBlack]}>{this.props.data.title}</Text>
                </View>
            </TouchableOpacity>

        )
    }
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    service: {
        flex: 1,
        flexDirection: 'column',
        margin: 2,
        padding: 10,
        backgroundColor: '#fff',
        width: width / 2,
        height: 150,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    serviceSelected: {
        flex: 1,
        flexDirection: 'column',
        margin: 2,
        padding: 10,
        backgroundColor: '#4bfff5',
        width: width / 2,
        height: 150,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 3,
    },
    colorWhite: {
        color: '#FFF'
    },
    colorBlack: {
        color: '#000'
    }
})
