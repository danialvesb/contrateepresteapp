import React, { Component } from 'react'
import {View, StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class RequestsWorks extends Component {
    render() {
        return(
            <View style={styles.container}>
                <ScrollView style={styles.scrool}>
                    <View style={styles.header}>
                        <View style={styles.details}>
                            <Text>Nome do cliente aqui</Text>
                        </View>
                        <View style={styles.details}>
                            <Text>Cidade/Estado do cliente</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.description}>
                            <Text>Descrição da Solicitação</Text>
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
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={{ fontSize: 15, color: '#FFF', textAlign: 'center'}}>Confirmar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={{ fontSize: 15, color: '#FFF', textAlign: 'center'}}>Negar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

            </View>
        )
    }

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
    details: {
        flex: 1,
        margin: 5,
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
        width: '100%',
        height: 150,

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
    buttonStyle: {
        width: '50%',
        backgroundColor: 'rgba(36,41,46,0.76)',
        padding: 10,
        margin: 1,
    },

})
