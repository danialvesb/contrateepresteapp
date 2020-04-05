import React, {Component} from 'react';
import {Modal, Text, TextInput, TouchableOpacity, View, Alert, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Textarea from 'react-native-textarea';

import PhotoCamera from '../Camera/PhotoCamera';
import {showSuccess} from '../../common';

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
                    <ScrollView>
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
                                        <View style={{flex: 3}}>
                                            <ScrollView horizontal={true} style={{flex: 1}} contentContainerStyle={{flexDirection: 'row'}}>
                                                <View style={styles.photo}>
                                                    <TouchableOpacity onPress={ () => console.log('press') } style={{margin: 4, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                                        <Icon name="camera" size={50} color='#FFF' />
                                                    </TouchableOpacity>
                                                </View>

                                            </ScrollView>
                                        </View>

                                    </View>
                                    <View style={styles.description}>
                                        <Text>Se for preciso pode especificar melhor</Text>
                                        <Textarea
                                            containerStyle={styles.textareaContainer}
                                            style={styles.textarea}
                                            // onChangeText={this.onChange}
                                            // defaultValue={this.state.text}
                                            maxLength={50}
                                            placeholder={'Descrição'}
                                            placeholderTextColor={'#c7c7c7'}
                                            underlineColorAndroid={'transparent'}                                        />
                                    </View>
                                </View>
                                <View style={styles.optionsModal}>
                                    <TouchableOpacity style={styles.buttonStyle}
                                                      onPress={() => {
                                                          this.setModalVisible(!this.state.modalVisible);
                                                          showSuccess('Serviço solicitado com sucesso, aguarde o retorno do profissional requisitado.')
                                                          this.props.navigation.navigate('Menu')
                                                      }}>
                                        <Text style={{ fontSize: 15, color: '#FFF'}}>Confirmar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonStyle}
                                                      onPress={() => {
                                                          this.setModalVisible(!this.state.modalVisible);
                                                      }}>
                                        <Text style={{ fontSize: 15, color: '#FFF'}}>Cancelar</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </ScrollView>
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
        marginTop: 30,
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
        justifyContent: 'center'
    },
    dataRequest: {
        flex: 5,

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
        backgroundColor: 'black',
        borderRadius: 5
    },
    textareaContainer: {
        height: 180,
        padding: 5,
        backgroundColor: '#F5FCFF',
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#333',
    },
    buttonStyle: {
        backgroundColor: 'rgba(36,41,46,0.76)',
        padding: 10,
        margin: 5,
        borderRadius: 10
    }

})
