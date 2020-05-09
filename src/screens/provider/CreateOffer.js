import React, {Component} from 'react'
import {View, StyleSheet, ScrollView, Text, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import axios from 'axios'
import {server, showError, showSuccess} from '../../common'
import {Avatar, Caption, Title} from 'react-native-paper'
import Search from '../../components/header/Search'
import CardService from '../../components/CardService'

import Icon from 'react-native-vector-icons/FontAwesome'
import Textarea from 'react-native-textarea'
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
    services: [],
    selectedServiceId: 0,
    spinner: false,
    data: {
        service: null,
        description: null,
        user: null,
        amount: null,
    },
}

export default class CreateOffer extends Component {
    componentDidMount = async () => {
        await this.getData()
    }

    state = {
        ...initialState,
    }

    getData = async () => {
        try {
            const access_token = await AsyncStorage.getItem('access_token')
            const resp = await axios({
                method: 'get',
                url: `${server}/services/`,
                headers: {
                    'Authorization': `bearer ${access_token}`
                },
            })
            this.setState({services: resp.data});
        } catch (err) {
            showError(err)
        }
    }

    render() {
        return (

            <View style={styles.container}>
                <ScrollView style={styles.scrool}>
                    <View style={styles.services}>
                        <View style={styles.servicesHeaderText}>
                            <Text>Selecione o tipo de serviço</Text>
                        </View>
                        <ScrollView horizontal={true} style={styles.scroolServices}>
                            {
                                this.state.services.map((item, index) => (
                                    <CardService key={item.id} data={item} selectedServiceId={this.state.selectedServiceId} setSelect={() => {this.setState({selectedServiceId: item.id})}} />
                                ))
                            }
                        </ScrollView>
                    </View>
                    <View style={styles.servicesHeaderText}>
                        <Text>Inserir Imagens</Text>
                    </View>
                    <View style={styles.photosList}>
                        <View>
                            <ScrollView horizontal={true} style={styles.scroolServices}>
                                <View style={styles.photo}>
                                    <TouchableOpacity onPress={() => console.log('press')} style={styles.photo}>
                                        <Icon name="camera" size={80} color='#ddd'/>
                                    </TouchableOpacity>
                                </View>

                            </ScrollView>
                        </View>

                    </View>
                    <View style={styles.servicesHeaderText}>
                        <Text>Definir preço do serviço</Text>
                    </View>
                    <View style={styles.amount}>
                        <View>
                            <TextInput style={styles.textInput} placeholder='Preço'/>
                        </View>
                    </View>
                    <View style={styles.servicesHeaderText}>
                        <Text>Descrição</Text>
                    </View>
                    <View style={styles.description}>
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            // onChangeText={this.onChange}
                            // defaultValue={this.state.text}
                            maxLength={50}
                            placeholder={'Descrição'}
                            placeholderTextColor={'#c7c7c7'}
                            underlineColorAndroid={'transparent'}/>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.buttonStyle}>
                            <Text style={{ fontSize: 15, color: '#FFF'}}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    services: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    scrool: {
        flex: 1,
        width: '100%',
        height: '100%',

    },
    scroolServices: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    photosList: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    photo: {
        flex: 1,
        margin: 5,
        padding: 5,
    },

    amount: {
        flex: 1,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,

    },
    description: {
        flex: 1,
        margin: 10,
    },
    servicesHeaderText: {
        fontSize: 15,
        margin: 10,
    },
    textInput: {
        fontSize: 15,
        color: '#000000',
        borderBottomWidth: 1,
        borderRadius: 3,
        padding: 0,
    },
    textareaContainer: {
        height: 100,
        padding: 5,
        backgroundColor: '#F5FCFF',
    },
    buttonStyle: {
        width: 100,
        backgroundColor: 'rgba(36,41,46,0.76)',
        padding: 10,
        margin: 5,
        borderRadius: 10
    },
})
