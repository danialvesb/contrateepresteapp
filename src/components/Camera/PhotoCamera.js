import React, { PureComponent } from 'react'
import {View, TouchableOpacity, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import { RNCamera } from 'react-native-camera'
import Icon from 'react-native-vector-icons/FontAwesome'

class PhotoCamera extends PureComponent {
    state = {
        type: RNCamera.Constants.Type.back,
        imageUri: null
    }

    flipCamera = () =>
        this.setState({
            type:
                this.state.type === RNCamera.Constants.Type.back
                    ? RNCamera.Constants.Type.front
                    : RNCamera.Constants.Type.back,
        })

    takePhoto = async () => {
        // const { onTakePhoto } = this.props
        const options = {
            quality: 0.5,
            base64: true,
            width: 300,
            height: 300,
            pauseAfterCapture: true
        }
        const { uri  } = await this.camera.takePictureAsync(options)
        this.setState({ imageUri: uri });
        // onTakePhoto(data.base64)
    }

    remove(camera) {
        this.setState({imageUri: null})
        camera.resumePreview()
    }

    changePhoto() {

    }

    render() {
        const { type, imageUri } = this.state
        console.log(imageUri)
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
                        {!this.state.imageUri &&
                            <View style={styles.bottomButtons}>
                                <TouchableOpacity onPress={() => this.takePhoto()} style={styles.recordingButton}>
                                    <Icon name="camera" size={35} color="white"/>
                                </TouchableOpacity>
                            </View>
                        }
                        {!this.state.imageUri &&
                            <View style={styles.bottomButtons}>
                            <TouchableOpacity onPress={ () => this.flipCamera() } style={styles.flipButton}>
                            <Icon name="refresh" size={35} color="white"/>
                            </TouchableOpacity>
                            </View>
                        }
                        {this.state.imageUri &&
                            <View style={styles.bottomButtons}>
                                <TouchableOpacity onPress={() => this.remove(this.camera) }>
                                    <Icon name="remove" size={35} color="white"/>
                                </TouchableOpacity>
                            </View>
                        }
                        {this.state.imageUri &&
                        <View style={styles.bottomButtons}>
                            <TouchableOpacity onPress={() => this.changePhoto() }>
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
