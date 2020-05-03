import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import Home from './screens/Home'
import { Avatar, Title, Caption, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import {server} from './common';

const DrawerNav = createDrawerNavigator();

export default class Menu extends Component {
    render() {
        return (
            <DrawerNav.Navigator drawerContent={props => this.drawerContent({...props})}>
                <DrawerNav.Screen name="HomeScreen" title='Início' component={Home} options={{ drawerLabel: 'Início' }}/>
            </DrawerNav.Navigator>
        )
    }

    drawerContent(props) {
        const { isLogged } = this.props.route.params
        const { user } = this.props.route.params
        return (
            <DrawerContentScrollView {...props} >
                <View style={styles.drawerContent}>
                    <View style={styles.profile}>
                        { isLogged ?
                            <View style={styles.userInfoSection}>
                                <TouchableOpacity onPress={() => { props.navigation.navigate('ProfilePage'), { user } }}>
                                    <Avatar.Image source={{uri: 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',}} size={80}/>
                                </TouchableOpacity>
                                <Title style={styles.title}>{user.name}</Title>
                                <Caption style={styles.caption}>Prestador</Caption>
                            </View>
                            :
                            <View style={styles.userInfoSection}>
                                <DrawerItem
                                    icon={({ color, size }) => (
                                        <Icon name="user" color={color} size={size}/>
                                    )}
                                    label="Entre ou Cadastre-se"
                                    onPress={() => { props.navigation.navigate('AuthPage') }}
                                />
                            </View>
                        }
                        <Drawer.Section style={styles.drawerSection}  title={user.group}>
                            <DrawerItem
                                icon={({ color, size, }) => (
                                    <Icon name="wechat" color={color} size={size}/>
                                )}
                                label="Conversas" onPress={() => {}}/>
                            <DrawerItem label="Ofertar Serviço" onPress={() => { props.navigation.navigate('CreateOfferPage') }}/>
                            <DrawerItem label="Solicitações Feitas" onPress={() => { props.navigation.navigate('SolicitationsStatusPage') }}/>
                            <DrawerItem label="Chamados" onPress={() => { props.navigation.navigate('RequestsWorksPage') }}/>
                        </Drawer.Section>

                        <Drawer.Section title="Preferências">
                            <TouchableRipple onPress={() => {}}>
                                <View style={styles.preference}>
                                    <Text>Notificações</Text>
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
        )
    }
}

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
