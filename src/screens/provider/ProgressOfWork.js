import React, { Component } from 'react'
import {View, StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar, Caption} from 'react-native-paper';

export default props => {
    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrool}>
                <View style={styles.content}>
                    <View style={styles.headerManager}>
                        <TouchableOpacity style={styles.buttonHeader}>
                            <Avatar.Image source={require('../../../assets/icons/message-icon.png')} size={40}/>
                            <Caption>Converse com seu cliente!</Caption>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.header}>
                        <View style={styles.details}>
                            <Text>Cliente: {props.data.customer}</Text>
                        </View>
                        <View style={styles.details}>
                            <Text>{props.data.city_customer}/{props.data.uf_customer}</Text>
                        </View>
                        <View style={styles.details}>
                            <Text>Bairro: {props.data.district_customer}</Text>
                        </View>
                    </View>
                    <View style={styles.labelDescription}>
                        <Text>Descrição da Solicitação:</Text>
                    </View>
                    <View style={styles.description}>
                        <View style={styles.descriptionContent}>
                            <Text>
                                {props.data.solicitation_message}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.photosList}>
                        <View>
                            <Text style={styles.servicesHeaderText}>Detalhes adicionais com fotos</Text>
                        </View>
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
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.buttonStyleAcept} onPress={()=> props.endService(props.data.id)}>
                            <Text style={{ fontSize: 15, color: '#FFF', textAlign: 'center'}}>Finalizar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonStyleRecuse} onPress={() => props.closeCalled(props.data.id)}>
                            <Text style={{ fontSize: 15, color: '#FFF', textAlign: 'center'}}>Fechar chamado</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        width: '100%',
        height: 100,
    },
    headerManager: {
        flex: 1,
        width: '100%',
        height: 70,
        borderBottomWidth: 1,
        borderColor: "rgba(0,0,0,0.09)"
    },
    buttonHeader: {
        marginLeft: 10,
        marginTop: 5
    },
    details: {
        flex: 1,
        margin: 5,
        borderBottomWidth: 1
    },
    content: {
        flex: 1,
        shadowColor: "#000",
        margin: 10,
        backgroundColor: '#fff',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 4,
    },
    description: {
        flex: 1,
        margin: 5,
        width: '98%',
        height: 150,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        borderColor: 'rgba(2,1,1,0.23)',
    },
    labelDescription: {
        margin: 5,
    },
    descriptionContent: {
        margin: 3,

    },
    footer: {
        flex: 1,
        margin: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrool: {
        flex: 1,
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
    scroolServices: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
    },
    photo: {
        flex: 1,
        margin: 5,
        padding: 5,
    },
    servicesHeaderText: {
        fontSize: 15,
        margin: 10,
    },
    buttonStyleAcept: {
        width: '50%',
        backgroundColor: 'rgba(28,116,72,0.76)',
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
