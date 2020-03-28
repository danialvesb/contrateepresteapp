import React, {Component} from 'react';
import {Modal, Text, TouchableOpacity, View, Alert, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

import PhotoCamera from '../Camera/PhotoCamera';
import {SafeAreaContext} from 'react-native-safe-area-context';
export default class RequestWorkConfirm extends Component {
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    confirmRequest() {
        this.setModalVisible({modalVisible: false})

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}
                    style={{flex: 1}}
                    onBackdropPress={() => this.setState({modalVisible: false})}>
                    <View  style={styles.modal}>
                        <View style={styles.headerModal}>
                            <Text style={{color: '#b07888', margin: 5, fontSize: 20}}>Solicitação de serviço</Text>
                        </View>
                        <View style={styles.contentModal}>
                            <View style={styles.dataRequest}>
                                <View style={styles.photosList}>
                                    <View style={{flex: 1}}>
                                        <Text style={{fontSize: 20, margin: 5}}>Inserir Imagens</Text>
                                    </View>
                                    <View style={{flex: 3, backgroundColor: 'blue'}}>
                                        <ScrollView horizontal={true} style={{flex: 1, backgroundColor: 'blue'}} contentContainerStyle={{flexDirection: 'row'}}>
                                            <View style={styles.photo}>
                                                <TouchableOpacity onPress={ () => console.log('press') } style={{margin: 4, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                                    <Icon name="camera" size={50} color='#FFF' />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.photo}>
                                                <TouchableOpacity onPress={ () => console.log('press') } style={{margin: 4, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                                    <Icon name="camera" size={50} color='#FFF' />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.photo}>
                                                <TouchableOpacity onPress={ () => console.log('press') } style={{margin: 4, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                                    <Icon name="camera" size={50} color='#FFF' />
                                                </TouchableOpacity>
                                            </View>

                                        </ScrollView>
                                    </View>

                                </View>
                                <View style={styles.description}>
                                    <Text>Resumo do seu serviço</Text>
                                </View>
                            </View>
                            <View style={styles.optionsModal}>
                                <TouchableOpacity style={{margin: 3}}
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Text>Confirmar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{margin: 3}}
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Text>Cancelar</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </Modal>

                <TouchableOpacity
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text style={{fontSize: 20}}>Solicitar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerModal: {
        backgroundColor: '#ffffff',
        alignItems: 'flex-start',
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    modal: {
        flex: 1,
        marginTop: 100,
        borderRadius: 15,
        elevation: 2,
        backgroundColor: '#addeff',
    },
    contentModal: {
        flex: 10,

    },
    optionsModal: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        backgroundColor: '#3fff6b',
        justifyContent: 'center'
    },
    dataRequest: {
        flex: 5,
        backgroundColor: '#ff3049',
        justifyContent: 'center',
    },
    description: {
        flex: 1,
        margin: 10,
        backgroundColor: '#FFF',
    },
    photosList: {
        flex: 1,
        margin: 10,
        backgroundColor: '#dbff5b',
        justifyContent: 'center'


    },
    photosListScrool: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#FFF',
        borderWidth: 0.5,
    },
    photo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3,
        backgroundColor: 'black'
    }


})
