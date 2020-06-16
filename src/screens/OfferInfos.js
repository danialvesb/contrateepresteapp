import React from 'react'
import {View, Text, StyleSheet, ScrollView, ActivityIndicator, ViewComponent, TouchableOpacity} from 'react-native';
import RequestOfferConfirm from '../components/Modals/RequestOfferConfirm';
import axios from 'axios'
import {server, showMessage} from '../common';
import {CheckBox} from 'react-native-elements';
import Comments from '../components/Comment/Comments';
import { UserConsumer } from '../Navigator'
import AsyncStorage from '@react-native-community/async-storage';

export  default class OfferInfos extends React.Component{
    state = {
        interactions: [],
        spinner: true,
        reply: '',
    }
    componentDidMount() {
        const { data } = this.props.route.params
        this.getInteractions(data.id)
    }

    async getInteractions(id) {
        let header = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;',
            },
        }
        await axios.get(`${server}/services/offers/interactions/${id}`, header).then(response => {
            this.setState({interactions: response.data})
        }).catch(() => {
            showMessage('Não foi possível carregar avaliações')
        })
    }
    setStateReply(text) {
        this.setState({reply: text})
    }
    async sendReply(evaluation) {
        const { data } = this.props.route.params
        let multipartFormDt = new FormData()
        const access_token = await AsyncStorage.getItem('access_token')

        multipartFormDt.append('evaluation_id', evaluation)
        multipartFormDt.append('reply', this.state.reply)

        let header = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;',
                'Authorization': `bearer ${access_token}`
            },
        }
        await axios.post(`${server}/services/offers/solicitations/reply`, multipartFormDt, header).then(() => {
            this.getInteractions(data.id)
        }).catch( err => {
            showMessage(JSON.stringify(err))
        })


    }

    render() {
        const { data } = this.props.route.params

        return (
            <UserConsumer>
                {value => {
                    return (
                        <ScrollView style={ styles.container }>
                            <View style={styles.content}>
                                <View style={styles.data}>
                                    <Text style={{fontSize: 20, color: 'rgba(36,41,46,0.76)'}}>{ data.service_title }</Text>
                                    <Text style={{fontSize: 20, color: 'rgba(36,41,46,0.76)'}}>{ `${data.city} / ${data.uf} ` }</Text>
                                    <Text style={{fontSize: 20, color: 'rgba(36,41,46,0.76)'}}>Qualificações</Text>
                                    <Text style={{fontSize: 20, color: 'rgba(36,41,46,0.76)'}}>V/H: { data.amount }</Text>

                                    <View style={styles.description}>
                                        <Text style={{marginBottom: 5, marginLeft: 3}}>Descrição:</Text>
                                        <Text style={{fontSize: 15 , color: 'rgba(36,41,46,0.76)', flex: 5, margin: 4}}>{data.description}</Text>
                                    </View>

                                </View>
                                <View style={styles.buttonsData}>
                                    <RequestOfferConfirm navigation={this.props.navigation} data={data}></RequestOfferConfirm>
                                </View>
                            </View>

                            {this.state.interactions.length > 0 &&
                                <View style={styles.content}>
                                    <View style={styles.headerComments}>
                                        <View>
                                            <View style={{marginRight: 40}}>
                                                <Text style={{fontSize: 40}}>4.7</Text>
                                            </View>

                                            <View style={{flexDirection: 'row', marginTop: 20}}>
                                                <CheckBox containerStyle={{margin:0, padding: 5}} checked ={true} uncheckedIcon='star-o' checkedIcon='star' checkedColor={'rgb(240, 208, 13)'} size={12}/>
                                                <CheckBox containerStyle={{margin:0, padding: 5}} checked={true} uncheckedIcon='star-o' checkedIcon='star' checkedColor={'rgb(240, 208, 13)'} size={12}/>
                                                <CheckBox containerStyle={{margin:0, padding: 5}} checked={true} uncheckedIcon='star-o' checkedIcon='star' checkedColor={'rgb(240, 208, 13)'} size={12}/>
                                                <CheckBox containerStyle={{margin:0, padding: 5}} checked={true} uncheckedIcon='star-o' checkedIcon='star' checkedColor={'rgb(240, 208, 13)'} size={12}/>
                                                <Text>5</Text>
                                            </View>
                                            <View style={{flexDirection: 'row', marginTop: 20}}>
                                                <CheckBox containerStyle={{margin:0, padding: 5}} checked={true} uncheckedIcon='star-o' checkedIcon='star' checkedColor={'rgb(240, 208, 13)'} size={12}/>
                                                <CheckBox containerStyle={{margin:0, padding: 5}} checked={true} uncheckedIcon='star-o' checkedIcon='star' checkedColor={'rgb(240, 208, 13)'} size={12}/>
                                                <CheckBox containerStyle={{margin:0, padding: 5}} checked={true} uncheckedIcon='star-o' checkedIcon='star' checkedColor={'rgb(240, 208, 13)'} size={12}/>
                                                <Text>5</Text>
                                            </View>
                                            <View style={{flexDirection: 'row', marginTop: 20}}>
                                                <CheckBox containerStyle={{margin:0, padding: 5}} checked={true} uncheckedIcon='star-o' checkedIcon='star' checkedColor={'rgb(240, 208, 13)'} size={12}/>
                                                <CheckBox containerStyle={{margin:0, padding: 5}} checked={true} uncheckedIcon='star-o' checkedIcon='star' checkedColor={'rgb(240, 208, 13)'} size={12}/>
                                                <CheckBox containerStyle={{margin:0, padding: 5}} checked={true} uncheckedIcon='star-o' checkedIcon='star' checkedColor={'rgb(240, 208, 13)'} size={12}/>
                                                <Text>5</Text>
                                            </View>
                                            <View style={{flexDirection: 'row', marginTop: 20}}>
                                                <CheckBox containerStyle={{margin:0, padding: 5}} checked={true} uncheckedIcon='star-o' checkedIcon='star' checkedColor={'rgb(240, 208, 13)'} size={12}/>
                                                <CheckBox containerStyle={{margin:0, padding: 5}} checked={true} uncheckedIcon='star-o' checkedIcon='star' checkedColor={'rgb(240, 208, 13)'} size={12}/>
                                                <Text>5</Text>
                                            </View>
                                            <View style={{flexDirection: 'row', marginTop: 20}}>
                                                <CheckBox containerStyle={{margin:0, padding: 5}} checked={true} uncheckedIcon='star-o' checkedIcon='star' checkedColor={'rgb(240, 208, 13)'} size={12}/>
                                                <Text>5</Text>
                                            </View>
                                        </View>
                                        <View style={{width: '95%', borderWidth: 0.5, borderColor: 'rgba(36,41,46,0.76)', margin: 4}} />
                                    </View>

                                    <View style={{flex: 1, width: '94%'}}>
                                        <Comments sendReply={ (evaluation) => this.sendReply(evaluation) } setStateReply={(text) => this.setStateReply(text)} userAuth={value.auth.user} interations={this.state.interactions}/>
                                    </View>
                                </View>
                            }
                            {this.state.interactions.length == 0 &&
                                <View style={styles.contentActivityIndicator}>
                                    <ActivityIndicator size='large'/>
                                </View>
                            }
                        </ScrollView>
                    )
                }
                }
            </UserConsumer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    content: {
        borderWidth: 0.5,
        borderColor: 'rgb(36, 41, 46)',
        width: '98%',
        minHeight: 550,
        margin: 5,
        borderRadius: 4,
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    contentActivityIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '98%',
        height: 80,
        margin: 5,
    },
    data: {
        borderColor: 'rgb(36, 41, 46)',
        width: '100%',
        height: 480,
        margin: 5,
        borderRadius: 4,
    },
    buttonsData: {
        width: '95%',
        height: 50,
    },
    options: {
        flex: 2,
        width: '70%',
        height: '20%',
        margin: 5,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        borderWidth: 0.5,
        borderColor: 'rgb(36, 41, 46)',
        width: '97%',
        height: 200,
        marginTop: 100,
        borderRadius: 4,
    },
    headerComments: {
        width: '100%',
        margin: 4,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})
