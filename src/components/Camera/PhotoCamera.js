import React, { PureComponent } from 'react'
import {View, TouchableOpacity, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import { RNCamera } from 'react-native-camera'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import {server, showMessage} from '../../common';
import AsyncStorage from '@react-native-community/async-storage';

class PhotoCamera extends PureComponent {
    state = {
        type: RNCamera.Constants.Type.back,
        dataCamera: null,
        disabled: false
    }

    flipCamera = () =>
        this.setState({
            type:
                this.state.type === RNCamera.Constants.Type.back
                    ? RNCamera.Constants.Type.front
                    : RNCamera.Constants.Type.back,
        })

    takePhoto = async () => {
        this.setState({disabled: true})

        const options = {
            quality: 0.5,
            base64: true,
            // width: 300,
            // height: 300,
            fixOrientation: true,
            pauseAfterCapture: true
        }
        const data = await this.camera.takePictureAsync(options)
        this.setState({ dataCamera: data });
    }

    remove(camera) {
        this.setState({dataCamera: null, disabled: false})
        camera.resumePreview()
    }

    async changePhoto(photo) {
        const access_token = await AsyncStorage.getItem('access_token')
        let multipartFormDt = new FormData()
        multipartFormDt.append('photo', photo)

        await axios({
            method: 'post',
            url: `${server}/me/update/photo`,
            headers: {
                'Authorization': `bearer ${access_token}`,
                'Content-Type': 'multipart/form-data',
            },
            data: multipartFormDt
        }).then(() => {

            this.props.navigation.navigate('ProfilePage')
        }).catch( () => {
            showMessage("Erro ao salvar imagem")
        })
    }

    render() {
        const { type } = this.state
        return (
            <View style={{flex: 1}}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref
                    }}
                    useNativeZoom={true}
                    type={type}
                    style={styles.preview}
                >
                    <View style={styles.container}>
                        {!this.state.dataCamera &&
                            <View style={styles.bottomButtons}>
                                <TouchableOpacity disabled={this.state.disabled} onPress={() => this.takePhoto()} style={styles.recordingButton}>
                                    <Icon name="camera" size={35} color="white"/>
                                </TouchableOpacity>
                            </View>
                        }
                        {!this.state.dataCamera &&
                            <View style={styles.bottomButtons}>
                            <TouchableOpacity onPress={ () => this.flipCamera() } style={styles.flipButton}>
                            <Icon name="refresh" size={35} color="white"/>
                            </TouchableOpacity>
                            </View>
                        }
                        {this.state.dataCamera &&
                            <View style={styles.bottomButtons}>
                                <TouchableOpacity onPress={() => this.remove(this.camera) }>
                                    <Icon name="remove" size={35} color="white"/>
                                </TouchableOpacity>
                            </View>
                        }
                        {this.state.dataCamera &&
                        <View style={styles.bottomButtons}>
                            <TouchableOpacity onPress={() => this.changePhoto(this.state.dataCamera.base64) }>
                                <Icon name="check" size={35} color="white"/>
                            </TouchableOpacity>
                        </View>
                        }
                    </View>
                </RNCamera>
            </View>


        )
    }
}

export default PhotoCamera

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        display: 'flex',
        height: 80,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        marginLeft: 80,
        alignItems: 'center',
    },
    containerViewImage: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    preview: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        marginLeft: 30
    },
    flipButton: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.00,
        elevation: 1,
    },
    recordingButton: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.00,
        elevation: 1,
    },
})
