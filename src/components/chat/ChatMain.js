import React from 'react'
import { Platform } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import emojiUtils from 'emoji-utils'
import SlackMessage from './SlackMessage'
import axios from 'axios'
import Pusher from 'pusher-js/react-native'
import {server, showError, showMessage} from '../../common'
import AsyncStorage from '@react-native-community/async-storage'

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
        this.pusher = new Pusher(pusherConfig.key, pusherConfig) // (1)
        this.chatChannel = this.pusher.subscribe('chat') // (2)
        this.chatChannel.bind('pusher:subscription_succeeded', () => { // (3)
            this.chatChannel.bind('join', (data) => { // (4)
                this.handleJoin(data.name)
            })
            this.chatChannel.bind('part', (data) => { // (5)
                this.handlePart(data.name)
            })
            this.chatChannel.bind('App\\Events\\MessageSent', (data) => { // (6)
                this.handleMessage(data)
            })
        })

        this.handleSendMessage = this.onSendMessage.bind(this) // (9)
    }
    state = {
        messages: [],
        authUser: [],
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

    handleMessage({ message }) { // (6)

        if (message.to_user == this.state.authUser.id) {
            const messageNew =
                {
                    _id: message.id,
                    text: message.text,
                    createdAt: message.created_at,
                    user: {
                        _id: message.from_user,
                        name: message.from_user_name,
                        avatar: `http://192.168.3.103:8000/api/me/_image/profile/${message.from_user_avatar}`
                    }
                }
            const messages = this.state.messages.slice()
            messages.unshift(messageNew)
            this.setState({
                messages: messages
            })
        }
    }

    //
    // componentWillUnmount() { // (8)
    //     fetch(`${pusherConfig.restServer}/users/${this.props.name}`, {
    //         method: 'DELETE'
    //     })
    // }
    //
    componentDidMount() {
        this.meValidateToken()
        this.loadMensages(this.props.route.params.item.id)
    }

    async meValidateToken() {
        const access_token = await AsyncStorage.getItem('access_token')
        if (access_token) {
            try {
                const responseRec = await axios({
                    method: 'post',
                    url: `${server}/auth/me`,
                    headers: {
                        'Authorization': `bearer ${access_token}`
                    },
                })
                this.setState({authUser: responseRec.data})
            }catch(err) {
                if (access_token)
                    await AsyncStorage.removeItem('access_token')
            }
        }
    }

    async loadMensages(solicitationId) {
        const access_token = await AsyncStorage.getItem('access_token')
        await axios.get(`${server}/chat/messages/${solicitationId}`, {
            headers: {
                'Authorization': `bearer ${access_token}`
            }
        }).then(response => {
            const messages = response.data.map((item, index) => (
                 {
                    _id: item.id,
                    text: item.text,
                    createdAt: item.created_at,
                    user: {
                        _id: item.from_user,
                        name: item.from_user_name,
                        avatar: `http://192.168.3.103:8000/api/me/_image/profile/${item.from_user_avatar}`
                    }
                }
            ))

            this.setState({messages})
        }).catch(err => {
            showError(JSON.stringify(JSON.stringify(err)))
        })
    }

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
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
        console.log(this.state.messages)
        // console.log(JSON.stringify(messages))
    }
    // [{"text":"Ssd","user":{"_id":1},"createdAt":"2020-06-14T18:29:44.300Z","_id":"0484edae-2d13-427c-8606-db85ff90864c"}]
    renderMessage(props) {
        const {
            currentMessage: { text: currText },
        } = props

        let messageTextStyle

        // Make "pure emoji" messages much bigger than plain text.
        if (currText && emojiUtils.isPureEmojiString(currText)) {
            messageTextStyle = {
                fontSize: 28,
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
                placeholder='Mensagem'
                multiline={false}
                renderMessage={this.renderMessage}
            />
        )
    }
}
