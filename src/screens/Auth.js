import React, { Component } from 'react'
import { ImageBackground, Text, StyleSheet, View, TextInput, TouchableOpacity, Picker } from 'react-native'

import axios from 'axios'


import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'

import { server, showError, showSuccess } from '../common'

const initialState = {
    name: 'sss',
    email: '',
    password: '',
    confirmPassword: '',
    typeAccount: 0,
    stageNew: false,
}

export default class Auth extends Component {
    state = {
        ...initialState
    }

    signinOrSignup = () => {
        if(this.state.stageNew) {
            this.signup()
        }else {
            this.signin()
        }
    }

    validatePassword = (password, passwordConfirm) => {

        if ((password === passwordConfirm) )
        {
            if (password.length > 7) {
                return true
            }
            showError('A senha deve conter pelo menos 8 caracteres');
        }else {
            showError('Senhas não coincidem');
        }

    }

    signup = async () => {

        if (this.validatePassword(this.state.password, this.state.confirmPassword) ){
            try {
                await axios({
                    method: 'post',
                    url: `${server}/signup`,
                    data: {
                        name: this.state.name,
                        email: this.state.email,
                        password: this.state.password
                    },
                })

                showSuccess('Usuário cadastrado!');
                this.setState({ ...initialState })
            } catch(err) {
                const error = err.message+`Nome:${this.state.name} \n Email: ${this.state.email} \n Senha:${this.state.password}`
                showError(error)
            }
        }


    }

    signin = async () => {
        try {
            const res = await axios({
                method: 'post',
                url: `${server}/auth/login`,
                data: {
                    email: this.state.email,
                    password: this.state.password
                },
                timeout: 5000
            })

            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.access_token}`
            this.props.navigation.navigate('Home')

        }catch(err) {
            const error = err.message+`Nome:${this.state.name} \n Email: ${this.state.email} \n Senha:${this.state.password}`
            showError(error)
        }
    }

     handleChangeOption = (val) => {
        if (val !== '0') {
            this.setState({typeAccount: val});
        }
    }

    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>
                    { this.state.stageNew ? 'Criar conta' : '' }
                </Text>
                {this.state.stageNew &&
                    <View style={styles.hr}/>
                }
                <View style={styles.formContainer}>
                    {this.state.stageNew &&
                        <TextInput placeholder='Nome' value={this.state.name}
                            style={styles.input} onChangeText={name => this.setState({ name }) }>
                        </TextInput>
                    }
                    <TextInput placeholder='E-mail' value={this.state.email}
                        style={styles.input} onChangeText={email => this.setState({ email }) }>
                    </TextInput>

                    <TextInput placeholder='Senha' value={this.state.password}
                        style={styles.input} onChangeText={password => this.setState({ password }) } secureTextEntry={true}>
                    </TextInput>

                    {this.state.stageNew &&
                        <TextInput placeholder='Confirme sua senha' value={this.state.confirmPassword}
                            style={styles.input} onChangeText={confirmPassword => this.setState({ confirmPassword }) } secureTextEntry={true}>
                        </TextInput>
                    }
                    {this.state.stageNew &&
                    <View style={styles.dropDown}>
                        <Picker selectedValue={ this.state.typeAccount}
                                onValueChange={ this.handleChangeOption }>
                            <Picker.Item  label='O que você deseja?' value='0' />
                            <Picker.Item label='Contratar algum serviço' value='1'/>
                            <Picker.Item label='Quero oferecer serviços' value='2'/>
                        </Picker>
                    </View>
                    }
                    <TouchableOpacity onPress={this.signinOrSignup}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                { this.state.stageNew ? 'Cadastre-se' : 'Entrar' }
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 10}} onPress={ () => { this.setState({ stageNew: !this.state.stageNew }) }}>
                        <Text style={styles.buttonText}>
                            { this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?' }
                        </Text>
                    </TouchableOpacity>
                </View>


            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        width: '90%'
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 10
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
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,

    },
    hr: {
        borderBottomColor: '#FFF',
        borderBottomWidth: 1,
        width: '100%'
    }
})
