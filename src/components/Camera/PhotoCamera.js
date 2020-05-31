import React, { PureComponent } from 'react'
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { RNCamera } from 'react-native-camera'
import Icon from 'react-native-vector-icons/FontAwesome'

class PhotoCamera extends PureComponent {
    state = {
        type: RNCamera.Constants.Type.back,
    }

    flipCamera = () =>
        this.setState({
            type:
                this.state.type === RNCamera.Constants.Type.back
                    ? RNCamera.Constants.Type.front
                    : RNCamera.Constants.Type.back,
        })

    takePhoto = async () => {
        const { onTakePhoto } = this.props
        const options = {
            quality: 0.5,
            base64: true,
            width: 300,
            height: 300,
        }
        const data = await this.camera.takePictureAsync(options)
        console.log(data.uri)
        // onTakePhoto(data.base64)
    }
    render() {
        const { type } = this.state
        return (
                <RNCamera
                    ref={ref => {
                        this.camera = ref
                    }}
                    type={type}
                    style={styles.preview}
                >
                    <View style={styles.container}>
                        <View style={styles.bottomButtons}>
                            <TouchableOpacity onPress={ () => this.takePhoto() } style={styles.recordingButton}>
                                <Icon name="camera" size={50} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomButtons}>
                            <TouchableOpacity onPress={ () => this.flipCamera() } style={styles.flipButton}>
                                <Icon name="refresh" size={35} color="white"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </RNCamera>

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
        marginLeft: 80

    },
    preview: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
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
