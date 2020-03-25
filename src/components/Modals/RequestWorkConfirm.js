import React, {Component} from 'react';
import {Modal, Text, TouchableOpacity, View, Alert} from 'react-native';

export default class RequestWorkConfirm extends Component {
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
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
                    style={{flex: 1, backgroundColor: '#acffcb'}}
                    onBackdropPress={() => this.setState({modalVisible: false})}>
                    <View  style={{flex: 1, backgroundColor: '#acffcb', marginLeft: 50, marginRight: 50, marginTop: 100, marginBottom: 500}}>
                        <View>
                            <Text>Hello World!</Text>

                            <TouchableOpacity
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text>Hide Modal</Text>
                            </TouchableOpacity>
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
