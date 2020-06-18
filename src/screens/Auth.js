import React, { Component } from 'react'
import {ImageBackground, Text, StyleSheet, View, TextInput, TouchableOpacity, Picker, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { Input } from 'react-native-elements'

import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'

import {server, showError, showMessage, showSuccess} from '../common';
import { UserConsumer } from '../Navigator'

const initialState = {
    name: 'Teste',
    email: 'daniel@gmail.com',
    password: '12345678',
    confirmPassword: '12345678',
    mobile: '12345678',
    typeAccount: null,
    stageNew: false,
    user: {},
    auth: {
        isLogged: false,
        user: {},
    }
}


export default class Auth extends Component {
    state = {
        ...initialState
    }

     signinOrSignup = async (value) => {
        if(this.state.stageNew) {
            await this.signup()
        }else {
            await this.signin(value)
        }
    }

    validatePassword = (password, passwordConfirm) => {
        if ((password === passwordConfirm) )
        {
            if (password.length > 7)
                return true

            showError('A senha deve conter pelo menos 8 caracteres')
        }else {
            showError('Senhas não coincidem')
        }
    }
    async me() {
        const access_token = await AsyncStorage.getItem('access_token')
        const responseRec = await axios({
            method: 'post',
            url: `${server}/auth/me`,
            headers: {
                'Authorization': `bearer ${access_token}`
            },
            timeout: 5000
        })
        this.setState({user: responseRec.data})
    }

    signup = async () => {
        if (this.state.typeAccount == null
            || this.state.email.length === 0 || this.state.mobile.length === 0
            || this.state.name .length === 0) {
            showMessage('Revise as informações')
        }else {
            if (this.validatePassword(this.state.password, this.state.confirmPassword) ){
                try {
                    await axios({
                        method: 'post',
                        url: `${server}/auth/signup`,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: {
                            name: this.state.name,
                            email: this.state.email,
                            password: this.state.password,
                            groups_id: this.state.typeAccount
                        },
                    })

                    showSuccess('Cadastro concluído!')
                    this.setState({stageNew: false})
                } catch(err) {
                    const error = err.message+`Nome:${this.state.name} \n Email: ${this.state.email} \n Senha:${this.state.password}`
                    showError(error)
                }
            }
        }
    }



    signin = async value => {
        if (this.state.email.length === 0
            || this.state.password === 0) {
            showMessage('Revise as informações')
        }else {
            try {
                const resAuth = await axios({
                    method: 'post',
                    url: `${server}/auth/login`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        email: this.state.email,
                        password: this.state.password
                    },
                })
                await AsyncStorage.setItem('access_token', resAuth.data.access_token)
                await this.me()

                const authNew = {
                    isLogged: true,
                    user: this.state.user,
                }

                this.setState({
                    auth: authNew
                })
                value.auth.setNewContext(this.state.auth)
                await this.props.navigation.navigate('Menu')

            }catch(err) {
                showError(err.message)
            }
        }
    }

     handleChangeOption = (val) => {
        if (val !== '0') {
            this.setState({typeAccount: val})
        }
    }

    resetState() {
        this.setState({name: '',
            email: '',
            password: '',
            confirmPassword: '',
            mobile: '',
            typeAccount: null,})
        this.setState({ stageNew: !this.state.stageNew })
    }

    render() {
        return (
            <UserConsumer>
                { value => {
                    return (
                        <ImageBackground source={backgroundImage} style={styles.background}>
                            <View style={[this.state.stageNew ? styles.formContainerResgister : styles.formContainer]}>
                                <ScrollView>
                                    {this.state.stageNew &&
                                        <View style={styles.inputContainer}>
                                            <Input
                                                style={styles.input}
                                                placeholder="Nome"
                                                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                                                onChangeText={name => this.setState({ name }) }
                                                leftIconContainerStyle={styles.leftIconContainerStyle}
                                                value={this.state.name}
                                                />
                                        </View>
                                    }
                                    <View style={styles.inputContainer}>
                                        <Input
                                            style={styles.input}
                                            placeholder="E-mail"
                                            leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                                            onChangeText={email => this.setState({ email }) }
                                            leftIconContainerStyle={styles.leftIconContainerStyle}
                                            value={this.state.email}
                                        />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <Input
                                            style={styles.input}
                                            placeholder="Senha"
                                            leftIcon={{ type: 'react-native-vector-icons', name: 'lock-outline'}}
                                            onChangeText={password => this.setState({ password }) } secureTextEntry={true}
                                            leftIconContainerStyle={styles.leftIconContainerStyle}
                                            value={this.state.password}
                                        />
                                    </View>

                                    {this.state.stageNew &&
                                        <View style={styles.inputContainer}>
                                            <Input
                                                style={styles.input}
                                                placeholder="Confirme sua senha"
                                                leftIcon={{ type: 'react-native-vector-icons', name: 'lock-outline' }}
                                                onChangeText={confirmPassword => this.setState({ confirmPassword }) } secureTextEntry={true}
                                                leftIconContainerStyle={styles.leftIconContainerStyle}
                                                value={this.state.confirmPassword}
                                            />
                                        </View>
                                    }
                                    {this.state.stageNew &&
                                        <View style={styles.inputContainer}>
                                            <Input
                                                style={styles.input}
                                                placeholder="Celular"
                                                leftIcon={{ type: 'font-awesome', name: 'mobile-phone' }}
                                                onChangeText={mobile => this.setState({ mobile }) }
                                                leftIconContainerStyle={styles.leftIconContainerStyle}
                                                value={this.state.mobile}
                                            />
                                        </View>
                                    }
                                    {this.state.stageNew &&
                                    <View style={styles.dropDown}>
                                        <Picker selectedValue={ this.state.typeAccount}
                                                onValueChange={ this.handleChangeOption }>
                                            <Picker.Item  label='O que você deseja ser?' value='0' />
                                            <Picker.Item label='Contratar algum serviço' value='2'/>
                                            <Picker.Item label='Quero oferecer serviços' value='1'/>
                                        </Picker>
                                    </View>
                                    }
                                    <TouchableOpacity onPress={ () => { this.signinOrSignup(value) } }>
                                        <View style={styles.button}>
                                            <Text style={commonStyles.textButtonsStyle}>
                                                { this.state.stageNew ? 'Cadastre-se' : 'Entrar' }
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ padding: 10}} onPress={ () => { this.resetState() }}>
                                        <Text style={ commonStyles.textButtonsStyle }>
                                            { this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?' }
                                        </Text>
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                        </ImageBackground>
                    )
                }
                }
            </UserConsumer>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 40,
        marginBottom: 10,
        marginLeft: 10,
        alignSelf: 'flex-start',
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.62)',
        padding: 20,
        width: '90%',
        borderRadius: 10,
    },
    formContainerResgister: {
        backgroundColor: 'rgba(0,0,0,0.62)',
        padding: 20,
        width: '90%',
        borderRadius: 10,
        height: '100%',
        justifyContent: 'flex-end',
        marginTop: 40
    },
    input: {
        fontFamily: commonStyles.fontFamily,
    },
    inputContainer: {
        marginTop: 10,
        backgroundColor: '#FFF',
        padding: 0,
        marginLeft: 0,
        borderRadius: 10,

    },
    userInfoSection: {
        paddingLeft: 20,
    },
    dropDown: {
        marginTop: 10,
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 10
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10
    },
    hr: {
        borderBottomColor: '#FFF',
        borderBottomWidth: 1,
        width: '100%'
    },
    leftIconContainerStyle: {
        marginLeft: 0,
        padding: 0
    },
    fieldStyle: {
        fontFamily: commonStyles.fontFamily,
        fontWeight: "400"
    },

})
