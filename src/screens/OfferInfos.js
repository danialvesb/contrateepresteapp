import React from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import RequestOfferConfirm from '../components/Modals/RequestOfferConfirm';
import axios from 'axios'
import {server, showMessage} from '../common';

export  default class OfferInfos extends React.Component{
    state = {
        interactions: []
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


    render() {
        const { data } = this.props.route.params

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

                {this.state.interactions &&
                    <View style={styles.content}>
                        <View style={styles.headerComments}>
                            <View style={{marginRight: 40}}>
                                <Text style={{fontSize: 40}}>4.7</Text>
                            </View>
                            <View>
                                <Text>5 estrelas</Text>
                                <Text>4 estrelas</Text>
                                <Text>3 estrelas</Text>
                                <Text>2 estrelas</Text>
                                <Text>1 estrelas</Text>
                            </View>
                            <View style={{width: '100%', borderWidth: 1, marginTop: 10}}>

                            </View>
                        </View>
                        <View>
                            <Text>Filano </Text>
                            <Text>Filano </Text>
                            <Text>Filano </Text>
                            <Text>Filano </Text>
                            <Text>Filano </Text>

                        </View>
                    </View>
                }

            </ScrollView>
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
        height: 550,
        margin: 5,
        borderRadius: 4,
        flexWrap: 'wrap',
        alignItems: 'center'
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
