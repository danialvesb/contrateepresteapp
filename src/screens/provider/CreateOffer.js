import React, {Component} from 'react'
import {View, StyleSheet, ScrollView, Text, TouchableOpacity, TextInput, Dimensions} from 'react-native'
import axios from 'axios'
import {server, showError, showMessage} from '../../common';
import CardService from '../../components/CardService'
import { TextInputMask } from 'react-native-masked-text'

import Icon from 'react-native-vector-icons/FontAwesome'
import Textarea from 'react-native-textarea'
import AsyncStorage from '@react-native-community/async-storage'
import {Divider} from 'react-native-paper';
import commonStyles from '../../commonStyles';

const initialState = {
    services: [],
    selectedServiceId: 0,
    spinner: false,
    description: null,
    user: null,

    owner_id: null,
    access_token: ''
}

export default class CreateOffer extends Component {
    componentDidMount = async () => {
        await this.getData()
    }

    state = {
        ...initialState,
        amount: this.props.value
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
            const me = await axios({
                method: 'post',
                url: `${server}/auth/me`,
                headers: {
                    'Authorization': `bearer ${access_token}`
                },
            })
            this.setState({services: resp.data, owner_id: me.data.id, access_token: access_token})
        } catch (err) {
            showError(err)
        }
    }
    storeOffer = async () => {
        try {
            const resp = await axios({
                method: 'post',
                url: `${server}/services/offers/`,
                headers: {
                    'Authorization': `bearer ${this.state.access_token}`
                },
                data: {
                    service_id: this.state.selectedServiceId,
                    owner_id: this.state.owner_id,
                    amount: this.state.amount,
                    description: this.state.description
                }
            }).then(() => {
                showMessage('Serviço ofertado com sucesso, bom trabalho!')
                this.props.navigation.navigate('Menu')
            })
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
                        <Divider/>
                        {/*<Text>Inserir Imagens</Text>*/}
                    </View>
                    {/*<View style={styles.photosList}>*/}
                    {/*    <View>*/}
                    {/*        <ScrollView horizontal={true} style={styles.scroolServices}>*/}
                    {/*            <View style={styles.photo}>*/}
                    {/*                <TouchableOpacity onPress={() => console.log('press')} style={styles.photo}>*/}
                    {/*                    <Icon name="camera" size={80} color='#ddd'/>*/}
                    {/*                </TouchableOpacity>*/}
                    {/*            </View>*/}

                    {/*        </ScrollView>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                    <View style={styles.servicesHeaderText}>
                        <Text>Definir preço do serviço</Text>
                    </View>
                    <View style={styles.amount}>
                        <View>
                            <TextInputMask
                                style={styles.textInput}
                                placeholder='Preço'
                                type={'money'}
                                onChange={this.props.onChange}
                                value={this.state.amount}
                                onChangeText={amount => this.setState({ amount })}
                            />
                        </View>
                    </View>
                    <Divider/>
                    <View style={styles.servicesHeaderText}>
                        <Text>Descrição</Text>
                    </View>
                    <View style={styles.description}>
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            onChangeText={description => this.setState({description})}
                            defaultValue={this.state.description}
                            maxLength={400}
                            placeholder={'Descrição'}
                            placeholderTextColor={'#c7c7c7'}
                            underlineColorAndroid={'transparent'}/>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.buttonStyle} onPress={()=> this.storeOffer()}>
                            <Text style={{ fontSize: 15, color: '#FFF', fontFamily: commonStyles.fontFamily}}>Confirmar</Text>
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
        height: 200,
        padding: 5,
        backgroundColor: '#F5FCFF',
    },
    buttonStyle: {
        width: "50%",

        backgroundColor: 'rgba(61,186,72,0.76)',
        padding: 10,
        margin: 5,
        borderRadius: 10
    },
})
