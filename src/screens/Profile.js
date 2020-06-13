import React, { Component } from 'react'
import {View, StyleSheet, ScrollView,TouchableOpacity} from 'react-native'
import {Avatar} from 'react-native-paper'
import axios from 'axios'
import {server, showError} from '../common'
import AsyncStorage from '@react-native-community/async-storage'
import { UserConsumer } from '../Navigator'
import commonStyles from '../commonStyles';
import { Divider, Text } from 'react-native-paper';
import { List } from 'react-native-paper';
import {Input} from 'react-native-elements';
import TakeOrChoosePhoto from '../components/Modals/TakeOrChoosePhoto';

const initialState = {
    name: null,
    email: null,
    mobile: null,
    city: null,
    uf: null,
    district: null,
    typeAccount: null,
    isLogged: false,
    user: {},
    stageUpdate: false,
    auth: {
        isLogged: false,
        user: {},
        photo: null
    }
}

export default class Profile extends Component{
    state = {
        ...initialState,
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
                    const {auth} = value
                    const imagePath = () => {
                        return this.state.photo ? this.state.photo : `http://192.168.3.103:8000/api/me/_image/profile/${auth.user.photo}`
                    }
                    return (
                        <View style={styles.containerStyle}>
                            <ScrollView>
                                <View style={styles.headerStyle}>
                                    {!this.state.stageUpdate ?
                                        <Avatar.Image
                                            source={{uri: imagePath(),}}
                                            size={80}/>
                                            :
                                        <View style={{justifyContent: 'center', alignItems: 'center', margin: 3}}>
                                            <Avatar.Image
                                                source={{uri: imagePath(),}}
                                                size={60}/>
                                            <TakeOrChoosePhoto navigation={this.props.navigation} title={'Foto de perfil'}/>
                                        </View>
                                    }
                                </View>
                                <View style={styles.contentStyle}>
                                    <View style={styles.containerStyleText}>
                                        <Text style={styles.labelStyleText}>{ auth.user.name }</Text>
                                    </View>
                                    <Divider />
                                    <View style={styles.containerStyleCaption}>
                                        {!this.state.stageUpdate ?
                                            <List.Item
                                                title="Email:"
                                                description={auth.user.email}
                                            />
                                            :
                                            <List.Item
                                                left={props => <View {...props} style={{width: '100%'}}>
                                                    <Text>Email:</Text>
                                                    <Input inputStyle={{paddingBottom: 0, marginBottom: 0}} value={auth.user.email} disabled={true}/>
                                                </View>}
                                            />
                                        }
                                        <Divider />
                                        {!this.state.stageUpdate ?
                                            <List.Item
                                                title="Celular:"
                                                description={auth.user.mobile}
                                            />
                                            :
                                            <List.Item
                                                left={props => <View {...props} style={{width: '100%'}}>
                                                    <Text>Celular:</Text>
                                                    <Input defaultValue={auth.user.mobile}
                                                        inputStyle={{paddingBottom: 0, marginBottom: 0}}
                                                        onChange={ value => { this.setState({ mobile: value }) } }
                                                        keyboardType='phone-pad'/>
                                                </View>}
                                            />
                                        }
                                        <Divider />
                                        {!this.state.stageUpdate ?
                                            <List.Item
                                                title="Cidade:"
                                                description={auth.user.city}
                                            />
                                            :
                                            <List.Item
                                                left={props => <View {...props} style={{width: '100%'}}>
                                                    <Text>Cidade:</Text>
                                                    <Input defaultValue={auth.user.city}
                                                        inputStyle={{paddingBottom: 0, marginBottom: 0}}
                                                        onChange={ value => { this.setState({ city: value }) } }/>
                                                </View>}
                                            />
                                        }
                                        <Divider />
                                        {!this.state.stageUpdate ?
                                            <List.Item
                                                title="Estado:"
                                                description={auth.user.uf}
                                            />
                                            :
                                            <List.Item
                                                left={props => <View {...props} style={{width: '100%'}}>
                                                    <Text>Estado:</Text>
                                                    <Input defaultValue={auth.user.uf}
                                                        inputStyle={{paddingBottom: 0, marginBottom: 0}}
                                                        onChange={ value => { this.setState({ uf: value }) } }/>
                                                </View>}
                                            />
                                        }
                                        <Divider />
                                        {!this.state.stageUpdate ?
                                            <List.Item
                                                title="Bairro:"
                                                description={auth.user.district}
                                            />
                                            :
                                            <List.Item
                                                left={props => <View {...props} style={{width: '100%'}}>
                                                    <Text>Bairro:</Text>
                                                    <Input defaultValue={auth.user.district}
                                                        inputStyle={{paddingBottom: 0, marginBottom: 0}}
                                                        onChange={ value => { this.setState({ district: value }) } }/>
                                                </View>}
                                            />
                                        }

                                        <Divider />
                                        {!this.state.stageUpdate &&
                                            <List.Item
                                                title="Tipo de perfil:"
                                                description={auth.user.group}
                                            />
                                        }
                                    </View>
                                </View>
                                <Divider />
                                <View style={styles.footer}>
                                    {!this.state.stageUpdate &&
                                        <TouchableOpacity style={styles.buttonStyleAcept} onPress={ () => { this.setState({stageUpdate: true}) }}>
                                            <Text style={commonStyles.textButtonsStyle}>Editar informações</Text>
                                        </TouchableOpacity>
                                    }
                                    {!this.state.stageUpdate &&
                                        <TouchableOpacity style={styles.buttonStyleRecuse} onPress={() => { this.logout(value) }}>
                                            <Text style={commonStyles.textButtonsStyle}>Sair</Text>
                                        </TouchableOpacity>
                                    }
                                    {this.state.stageUpdate &&
                                    <TouchableOpacity style={styles.buttonStyleSave} onPress={ () => { this.onClimeUpdate({mobile: this.state.mobile, city: this.state.city, uf: this.state.uf, district: this.state.district }, value) } }>
                                        <Text style={commonStyles.textButtonsStyle}>Salvar</Text>
                                    </TouchableOpacity>
                                    }
                                </View>
                            </ScrollView>
                        </View>
                    )
                }
                }
            </UserConsumer>
        )
    }
    async onClimeUpdate(data, context) {
        const access_token = await AsyncStorage.getItem('access_token')
        let multipartFormDt = new FormData()
        multipartFormDt.append('mobile', data.mobile)
        multipartFormDt.append('city', data.city)
        multipartFormDt.append('uf', data.uf)
        multipartFormDt.append('district', data.district)

        await axios({
            method: 'PUT',
            url: `${server}/me/update`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;',
                'Authorization': `bearer ${access_token}`
            },
            data: multipartFormDt
        }).then( response => {
            context.auth.setNewContext(response.data)
            this.setState({stageUpdate: false})
        }).catch(err => {
            showError(JSON.stringify(err))
        })
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
        fontSize: 24,
        width: '50%',
        fontFamily: commonStyles.fontFamily
    },
    labelStyleCaption: {
        fontSize: 20,
        marginTop: 20
    },
    footer: {
        flex: 1,
        marginTop: 3,
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
        borderRadius: 10
    },
    buttonStyleRecuse: {
        width: '50%',
        backgroundColor: 'rgba(191,12,48,0.76)',
        padding: 10,
        margin: 1,
        borderRadius: 10
    },
    buttonStyleSave: {
        width: 300,
        backgroundColor: 'rgba(28,116,72,0.76)',
        padding: 10,
        margin: 5,
        borderRadius: 10
    }
})
