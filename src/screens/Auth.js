import React, { Component } from 'react'
import { ImageBackground, Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import axios from 'axios'


import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'

import { server, showError, showSuccess, instanceAxios } from '../common'

const initialState = {
    name: 'sss',
    email: '',
    password: '',
    confirmPassword: '',
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

    signup = async () => {
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

    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        { this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados' }
                    </Text>
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
                        <TextInput placeholder='Confirmação de Senha' value={this.state.confirmPassword}
                            style={styles.input} onChangeText={confirmPassword => this.setState({ confirmPassword }) } secureTextEntry={true}>
                        </TextInput>
                    }
                    <TouchableOpacity onPress={this.signinOrSignup}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                { this.state.stageNew ? 'Registrar' : 'Entrar' }
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
        fontSize: 70,
        marginBottom: 10
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
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    }
})