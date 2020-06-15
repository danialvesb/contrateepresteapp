import React from 'react'
import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Textarea from 'react-native-textarea';
import {server, showMessage} from '../../common';
import commonStyles from '../../commonStyles';
import { CheckBox } from 'react-native-elements'
import axios from 'axios'

const initialState = {
    me: {},
    modalVisible: false,
    checkedOne: false,
    checkedTwo: false,
    checkedThree: false,
    checkedFour: false,
    checkedFive: false,
    rating: null,
    message: null
}

export default class EvaluateService extends React.Component {
    state = {
        ...initialState
    }

    setModalVisible(modalVisible) {
        this.setState({modalVisible})
    }

    async sendEvaluation() {
        if (this.state.message === null || this.state.rating === null) {
            showMessage('For favor preencha os campos da avaliação')
        }else {


            await axios.post(`${server}/services/offers/solicitations/evaluate`, )

            this.setModalVisible(false)
            this.props.navigation.navigate('Menu')
            showMessage('Obrigado por avaliar')
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible)
                    }}
                    style={{flex: 1}}
                    onBackdropPress={() => this.setState({modalVisible: false})}>
                    <ScrollView>
                        <View  style={styles.modal}>
                            <View style={styles.headerModal}>
                                <Text style={{margin: 5, fontSize: 20, color: 'white'}}>Avaliar seviço</Text>
                            </View>
                            <View style={styles.rating}>
                                <CheckBox checked={this.state.checkedOne} uncheckedIcon='star-o' checkedIcon='star' checkedColor={'rgb(240, 208, 13)'}
                                          onPress={ () => this.setState({checkedOne: true, rating: 1})}/>
                                <CheckBox checked={this.state.checkedTwo} uncheckedIcon='star-o' checkedIcon='star'
                                          onPress={ () => this.setState({checkedOne: true, checkedTwo: true, rating: 2})} checkedColor={'rgb(240, 208, 13)'}/>
                                <CheckBox checked={this.state.checkedThree} uncheckedIcon='star-o' checkedIcon='star'
                                          onPress={ () => this.setState({checkedOne: true, checkedTwo: true, checkedThree: true, rating: 3})} checkedColor={'rgb(240, 208, 13)'}/>
                                <CheckBox checked={this.state.checkedFour} uncheckedIcon='star-o' checkedIcon='star'
                                          onPress={ () => this.setState({checkedOne: true, checkedTwo: true, checkedThree: true, checkedFour: true, rating: 4})} checkedColor={'rgb(240, 208, 13)'}/>
                                <CheckBox checked={this.state.checkedFive} uncheckedIcon='star-o' checkedIcon='star'
                                          onPress={ () => this.setState({checkedOne: true, checkedTwo: true, checkedThree: true, checkedFour: true, checkedFive: true, rating: 5})} checkedColor={'rgb(240, 208, 13)'}/>
                            </View>
                            <View style={styles.contentModal}>
                                <View style={styles.dataRequest}>
                                    <View style={styles.description}>
                                        <Text>Qual a sua opinição sobre o serviaço prestado?</Text>
                                        <Textarea
                                            containerStyle={styles.textareaContainer}
                                            style={styles.textarea}
                                            onChangeText={message => this.setState({ message }) }
                                            defaultValue={this.state.message}
                                            maxLength={50}
                                            placeholder={'Opnição'}
                                            placeholderTextColor={'#c7c7c7'}
                                            underlineColorAndroid={'transparent'}/>
                                    </View>
                                </View>
                                <View style={styles.optionsModal}>
                                    <TouchableOpacity style={styles.buttonStyle}
                                                      onPress={() => {
                                                          this.sendEvaluation()
                                                      }}>
                                        <Text style={{ fontSize: 14, color: '#FFF'}}>Confirmar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonStyleCancell}
                                                      onPress={() => {
                                                          this.setModalVisible(!this.state.modalVisible)
                                                      }}>
                                        <Text style={{ fontSize: 14, color: '#FFF'}}>Cancelar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </Modal>
                <TouchableOpacity
                    onPress={() => {
                        this.setModalVisible(true);
                    }}
                    style={styles.buttonStyleFinished}>
                    <Text style={ commonStyles.textButtonsStyle }>Avaliar serviço</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerModal: {
        backgroundColor: 'rgb(49,63,95)',
        alignItems: 'flex-start',
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    modal: {
        flex: 1,
        marginTop: 30,
        borderRadius: 15,
        backgroundColor: 'rgb(49,63,95)',
        elevation:4,
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
        backgroundColor: 'rgba(28,116,72,0.76)',
        padding: 10,
        margin: 5,
        borderRadius: 10
    },
    buttonStyleCancell: {
        backgroundColor: 'rgba(191,12,48,0.76)',
        padding: 10,
        margin: 5,
        borderRadius: 10
    },
    buttonStyleFinished: {
        backgroundColor: '#187FF5',
        padding: 4,
        margin: 5,
        borderRadius: 10,
        width: '45%',
        height: "70%",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontFamily: "Montserrat-Regular",
        fontWeight: "400",
        color: "#FFF"
    },
    rating: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgba(246,246,246,0.13)',
    }
})
