import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {TouchableOpacity, View, Text} from 'react-native';

export default class Chats extends React.Component {
    state = {
        messages: [],

    }

    componentDidMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        })
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    render() {
        return (
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                <TouchableOpacity style={{backgroundColor: 'rgba(10,83,52,0.45)', width: '90%', height: 50, margin: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}} onPress={ () => this.props.navigation.navigate('ChatPage')}>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white'}}>Fulano x</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: 'rgba(10,83,52,0.45)', width: '90%', height: 50, margin: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}} onPress={ () => this.props.navigation.navigate('ChatPage')}>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white'}}>Fulano x</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: 'rgba(10,83,52,0.45)', width: '90%', height: 50, margin: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}} onPress={ () => this.props.navigation.navigate('ChatPage')}>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white'}}>Fulano x</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: 'rgba(10,83,52,0.45)', width: '90%', height: 50, margin: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}} onPress={ () => this.props.navigation.navigate('ChatPage')}>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white'}}>Fulano x</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
