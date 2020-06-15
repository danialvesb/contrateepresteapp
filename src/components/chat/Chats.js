import React from 'react'
import {TouchableOpacity, View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {UserConsumer} from '../../Navigator';
import axios from 'axios'
import {server, showError} from '../../common';
import AsyncStorage from '@react-native-community/async-storage';
import commonStyles from '../../commonStyles';
import {Avatar} from 'react-native-paper';


export default class Chats extends React.Component {
    state = {
        chats: [],
        authUser: null,
        spinner: true,
        refreshing: false,
        setRefreshing: 0

    }
    componentDidMount() {
        this.loadChats()
    }

    async loadChats() {
        const access_token = await AsyncStorage.getItem('access_token')

        await axios.get(`${server}/chat`, {
            headers: {
                'Authorization': `bearer ${access_token}`
            }
        }).then( response => {
                this.setState({chats: response.data})
            }).catch( err => {
                showError(JSON.stringify(err))
            })
    }
    onRefresh = async () => {
        this.setState({refreshing: true})
        await this.loadChats()
        this.setState({refreshing: false})

    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <UserConsumer>
                {value => {
                    return (
                        <View style={styles.container}>
                            <View style={styles.scrollview}>
                                <ScrollView
                                    refreshControl={
                                        <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />
                                    }>
                                    {this.state.chats &&
                                    this.state.chats.map((item, index) => (
                                        <TouchableOpacity style={styles.chats} key={item.id} onPress={ () => navigate('ChatPage', {item:item})}>
                                            <View style={{alignItems: 'center', justifyContent: 'center', width: '100%',}}>
                                                {value.auth.user.name === item.owner_solicitation_name &&
                                                <View style={{ flexDirection: 'row', width: '90%'}}>
                                                    <Avatar.Image source={{uri: `http://192.168.3.103:8000/api/me/_image/profile/${item.owner_offer_photo}`,}} size={40}/>
                                                    <View style={{flexDirection: 'row', width: '80%', alignItems: 'center', justifyContent: 'center'}}>
                                                        <Text style={styles.userName}>{item.owner_offer_name}</Text>
                                                    </View>
                                                </View>
                                                }
                                                {value.auth.user.name === item.owner_offer_name &&
                                                   <View style={{ flexDirection: 'row'}}>
                                                        <Avatar.Image source={{uri: `http://192.168.3.103:8000/api/me/_image/profile/${item.owner_solicitation_photo}`,}} size={40}/>
                                                        <View style={{flexDirection: 'row', width: '80%', alignItems: 'center', justifyContent: 'center'}}>
                                                            <Text style={styles.userName}>{item.owner_solicitation_name}</Text>
                                                        </View>
                                                    </View>
                                                }
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                    }
                                </ScrollView>
                            </View>
                        </View>
                    )
                }
                }
            </UserConsumer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    chats: {
        backgroundColor: 'rgba(36,41,46,0.28)',
        width: '90%',
        height: 50,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview: {
        flex: 5
    },
    userName: {
        color: 'white',
        marginLeft: 10,
        fontFamily: commonStyles.fontFamily,
    }
})
