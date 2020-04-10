import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import Home from './screens/Home'
import {showError} from './common';
import {useTheme, Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch,} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'

const DrawerNav = createDrawerNavigator();

const initialState = {
    userName: '',
    isLogged: false,
}

class MyDrawer extends Component {
    state = {
        ...initialState
    }
    componentDidUpdate = async () => {
        const userData = await AsyncStorage.getItem('user_auth_token')
        const userDataJson = JSON.parse(userData)

        if (userDataJson && userDataJson.access_token) {
            this.setState({ isLogged: true })
        }else {
            this.setState({ isLogged: false })
        }
    }

    render() {
        return (
            <DrawerNav.Navigator isLogged={this.state.isLogged}  drawerContent={props => <DrawerContent {...props} isLogged={this.state.isLogged} />}>
                <DrawerNav.Screen name="HomeScreen" component={Home}/>
            </DrawerNav.Navigator>
        )
    }
}

async function logout() {
    try {
        await AsyncStorage.removeItem('user_auth_token')
    } catch(e) {
        // remove error
    }

    console.log('Done.')

}

function DrawerContent(props) {
    return (
        <DrawerContentScrollView {...props} >
            <View  style={styles.drawerContent}>
                <View style={styles.profile}>
                    {
                        props.isLogged ?
                        <View style={styles.userInfoSection}>
                            <Avatar.Image source={{uri: 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',}} size={60}/>
                            <Title style={styles.title}>Dawid Urbaniak</Title>
                            <Caption style={styles.caption}>@trensik</Caption>
                        </View>
                        :
                        <View style={styles.userInfoSection}>
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="account-outline"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Entrar"
                                onPress={() => {props.navigation.navigate('AuthPage')}}
                            />
                        </View>
                        }

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="account-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Conversas"
                            onPress={() => {}}

                            />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon name="tune" color={color} size={size} />
                            )}
                            label="Ofertar Serviço"
                            onPress={() => {}}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="bookmark-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Solicitações Feitas"
                            onPress={() => {}}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="bookmark-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Chamados"
                            onPress={() => {}}
                        />


                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={false} />
                                </View>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple onPress={() => {}}>
                            <View style={styles.preference}>
                                <Text>RTL</Text>
                                <View pointerEvents="none">
                                    <Switch value={false} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
                <DrawerItemList {...props} />
            </View>

        </DrawerContentScrollView>
    );
}


export default () =>  <MyDrawer />

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        marginTop: 20,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
})
