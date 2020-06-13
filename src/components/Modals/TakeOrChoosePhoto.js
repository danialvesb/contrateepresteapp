import React, {Component} from 'react';
import {Modal, Text, TouchableOpacity, View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import { List, Headline } from 'react-native-paper';
import commonStyles from '../../commonStyles';

const initialState = {
    modalVisible: false,
}
export default class TakeOrChoosePhoto extends Component {
    state = {
        ...initialState,
    }

    showModal(modalVisible) {
        this.setState({modalVisible});
    }
    hideModal() {
        this.showModal({modalVisible: false})
    }
    navigateCamera() {
        this.hideModal()
        this.props.navigation.navigate('Camera')
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.hideModal()
                    }}
                    onBackdropPress={() => this.setState({modalVisible: false})}>
                    <ScrollView>
                        <View style={styles.modalStyle}>
                            <Headline style={styles.titleStyle}>{ this.props.title }</Headline>
                            {/*<TouchableOpacity>*/}
                            {/*    <List.Item*/}
                            {/*        title="Galeria"*/}
                            {/*        titleStyle={{color: 'white', fontFamily: commonStyles.fontFamily}}*/}
                            {/*        left={props => <List.Icon {...props} color={'white'} icon="folder" />}*/}
                            {/*    />*/}
                            {/*</TouchableOpacity>*/}
                            <TouchableOpacity onPress={ () =>  this.navigateCamera()}>
                                <List.Item
                                    title="Camera"
                                    titleStyle={{color: 'white', fontFamily: commonStyles.fontFamily}}
                                    left={props => <List.Icon {...props} color={'white'} icon="camera" />}
                                />
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </Modal>

                <TouchableOpacity
                    onPress={() => {
                        this.showModal(true);
                    }}
                    style={styles.buttonStyle}>
                    <Text style={{color: 'white', fontFamily: commonStyles.fontFamily}}>Carregar imagem</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    modalStyle: {
        flex: 1,
        marginTop: Dimensions.get('window').height -200,
        backgroundColor: 'rgb(36, 41, 46)',
        elevation:4,
        height: 200,
    },
    titleStyle: {
        color: 'white',
        textAlign: 'center',
        fontFamily: commonStyles.fontFamily
    },
    buttonStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
        borderRadius: 5,
        padding: 2
    },

})
