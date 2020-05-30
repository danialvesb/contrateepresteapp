import React, { Component } from 'react'
import {View, StyleSheet, ScrollView, Text, TouchableOpacity} from 'react-native'
import {Avatar, Caption} from 'react-native-paper'
import axios from 'axios'
import {server, showError} from '../common'
import AsyncStorage from '@react-native-community/async-storage'
import { UserConsumer } from '../Navigator'
import commonStyles from '../commonStyles';

const initialState = {
    name: 'Daniel Alves',
    email: 'daniel@gmail.com',
    password: '12345678',
    mobile: '9229292929',
    city: 'Goiânia',
    uf: 'Goiás',
    district: 'Parque tremendão',
    typeAccount: 'Prestador',
    isLogged: false,
    user: {},
    auth: {
        isLogged: false,
        user: {}
    }
}

export default class Profile extends Component{
    state = {
        ...initialState
    }
    componentDidMount = async () => {
        // await this.me()
    }

    logout = async (value) => {
        try {
            const access_token = await AsyncStorage.getItem('access_token')
            const resAuth = await axios({
                method: 'post',
                url: `${server}/auth/logout`,
                headers: {
                    'Authorization': `bearer ${access_token}`
                },
                timeout: 5000
            })
            await AsyncStorage.removeItem('access_token')
            await value.auth.setNewContext(this.state.auth)
            this.props.navigation.navigate('Menu')

        }catch(err) {
            const error = err.message+`Nome:${this.state.name} \n Email: ${this.state.email} \n Senha:${this.state.password}`
            showError(error)
        }
    }

    render() {
        return (
            <UserConsumer>
                {value => {
                    console.log(value.auth.user)
                    const {auth} = value
                    return (
                        <View style={styles.containerStyle}>
                            <ScrollView>
                                <View style={styles.headerStyle}>
                                    <Avatar.Image source={{uri: `http://192.168.3.103:8000/api/me/_image/profile/${auth.user.photo}`,}} size={80}/>
                                </View>
                                <View style={styles.contentStyle}>
                                    <View style={styles.containerStyleText}>
                                        <Text style={styles.labelStyleText}>{ auth.user.name }</Text>
                                    </View>
                                    <View style={styles.containerStyleCaption}>
                                        <Caption style={styles.labelStyleCaption}>{ auth.user.email }</Caption>
                                        <Caption style={styles.labelStyleCaption}>{ auth.user.mobile }</Caption>
                                        <Caption style={styles.labelStyleCaption}>{ auth.user.city }</Caption>
                                        <Caption style={styles.labelStyleCaption}>{ auth.user.uf }</Caption>
                                        <Caption style={styles.labelStyleCaption}>{ auth.user.district }</Caption>
                                        <Caption style={styles.labelStyleCaption}>{ auth.user.group }</Caption>
                                    </View>
                                </View>
                                <View style={styles.footer}>
                                    <TouchableOpacity style={styles.buttonStyleAcept}>
                                        <Text style={ commonStyles.textButtonsStyle }>Editar informações</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonStyleRecuse} onPress={() => { this.logout(value) }}>
                                        <Text style={ commonStyles.textButtonsStyle }>Sair</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    )
                }
                }
            </UserConsumer>
        )
    }
    async me() {
        const access_token = await AsyncStorage.getItem('access_token')
        const responseRec = await axios({
            method: 'post',
            url: `${server}/auth/me`,
            headers: {
                'Authorization': `bearer ${access_token}`
            },
        })
        if (responseRec.data.id) {
            this.setState({ user: responseRec.data })
        }else {
            await AsyncStorage.removeItem('access_token')
            this.setState({isLogged: false})
        }
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        width: '100%',
        height: '100%',
    },
    headerStyle: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(36, 41, 46)'
    },
    containerStyleText: {
        alignItems: 'center'
    },
    containerStyleCaption: {
        width: '90%',
        padding: 3
    },
    labelStyleText: {
        borderBottomWidth: 1,
        borderColor: 'rgba(36,41,46,0.23)',
        fontSize: 24,
        width: '50%',
    },
    labelStyleCaption: {
        borderBottomWidth: 1,
        borderColor: 'rgba(36,41,46,0.23)',
        fontSize: 20,
        marginTop: 20
    },
    footer: {
        flex: 1,
        margin: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyleAcept: {
        width: '50%',
        backgroundColor: 'rgb(36, 41, 46)',
        padding: 10,
        margin: 1,
    },
    buttonStyleRecuse: {
        width: '50%',
        backgroundColor: 'rgba(191,12,48,0.76)',
        padding: 10,
        margin: 1,
    },
})
