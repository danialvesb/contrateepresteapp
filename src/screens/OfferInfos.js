import React from 'react'
import {View, Text, StyleSheet, ScrollView, ActivityIndicator, ViewComponent, TouchableOpacity} from 'react-native';
import RequestOfferConfirm from '../components/Modals/RequestOfferConfirm';
import axios from 'axios'
import {server, showMessage} from '../common';
import {CheckBox} from 'react-native-elements';
import Comments from '../components/Comment/Comments';
import { UserConsumer } from '../Navigator'
import AsyncStorage from '@react-native-community/async-storage';
import {Divider} from 'react-native-paper';
import commonStyles from '../commonStyles';

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
        this.setState({reply: ''})
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
                                    <Text style={styles.infors}>{ data.service_title }</Text>
                                    <Text style={styles.inforsLocation}>{`Cidade: ${data.city} / ${data.uf} ` }</Text>
                                    <Text style={styles.inforsLocation}>Valor por hora: { data.amount }</Text>
                                    <Divider/>
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
                                                <Text style={{fontSize: 20}}>Avaliações do profissional</Text>
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
        minHeight: 500,
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
        minHeight: 480,
        margin: 5,
        borderRadius: 4,
    },
    infors: {
        fontSize: 30,
        color: 'white',
        fontFamily: commonStyles.fontFamily,
        backgroundColor: 'rgba(79,93,182,0.28)'
    },
    inforsLocation: {
        color: 'rgba(36,41,46,0.76)',
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
        width: '97%',
        minHeight: 200,
        marginTop: 4,
    },
    headerComments: {
        width: '100%',
        margin: 4,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})
