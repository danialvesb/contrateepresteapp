import React from 'react'
import { Platform } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import emojiUtils from 'emoji-utils'
import SlackMessage from './SlackMessage'

import Pusher from 'pusher-js/react-native'
import {server} from '../../common';

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true

const pusherConfig = {
    appId:"1018759",
    key: 'bf29c9d38bc2d308bd8b',
    secret:"da2c5b0f98e1d30628e3",
    restServer:"http://192.168.3.103:8000/api/",
    encrypted:true,
    cluster: 'us2',
}

export default class ChatMain extends React.Component {
    constructor(props) {
        super(props)
        this.pusher = new Pusher(pusherConfig.key, pusherConfig); // (1)
        this.chatChannel = this.pusher.subscribe('chat'); // (2)
        this.chatChannel.bind('pusher:subscription_succeeded', () => { // (3)
            this.chatChannel.bind('join', (data) => { // (4)
                this.handleJoin(data.name)
            })
            this.chatChannel.bind('part', (data) => { // (5)
                this.handlePart(data.name)
            })
            this.chatChannel.bind('message', (data) => { // (6)
                this.handleMessage(data.name, data.message)
            })
        })

        this.handleSendMessage = this.onSendMessage.bind(this) // (9)
    }
    state = {
        messages: [],
    }

    handleJoin(name) { // (4)
        const messages = this.state.messages.slice()
        messages.push({action: 'join', name: name})
        this.setState({
            messages: messages
        })
    }

    handlePart(name) { // (5)
        const messages = this.state.messages.slice()
        messages.push({action: 'part', name: name})
        this.setState({
            messages: messages
        })
    }

    handleMessage(name, message) { // (6)
        const messages = this.state.messages.slice()
        messages.push({action: 'message', name: name, message: message})
        this.setState({
            messages: messages
        })
    }

    // componentDidMount() { // (7)
    //     fetch(`${server.restServer}/users/${this.props.name}`, {
    //         method: 'PUT'
    //     })
    // }
    //
    // componentWillUnmount() { // (8)
    //     fetch(`${pusherConfig.restServer}/users/${this.props.name}`, {
    //         method: 'DELETE'
    //     })
    // }
    //
    onSendMessage(text) { // (9)
        const payload = {
            message: text
        }
        fetch(`${server}/chat/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
    }

    componentDidMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer!!!',
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

    renderMessage(props) {
        const {
            currentMessage: { text: currText },
        } = props

        let messageTextStyle

        // Make "pure emoji" messages much bigger than plain text.
        if (currText && emojiUtils.isPureEmojiString(currText)) {
            messageTextStyle = {
                fontSize: 28,
                // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
                lineHeight: Platform.OS === 'android' ? 34 : 30,
            }
        }

        return <SlackMessage {...props} messageTextStyle={messageTextStyle} />
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 1,
                }}
                renderMessage={this.renderMessage}
            />
        )
    }
}
