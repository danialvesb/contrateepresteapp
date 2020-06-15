import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import Home from './screens/Home'
import { Avatar, Title, Caption, Drawer } from 'react-native-paper'
import { UserConsumer } from './Navigator'
import Icon from 'react-native-vector-icons/FontAwesome'

const DrawerNav = createDrawerNavigator()

export default class Menu extends Component {
    render() {
        return (
            <UserConsumer>
                { value => {
                    return (
                        <DrawerNav.Navigator drawerContent={props => this.drawerContent({...props,  value})} >
                            <DrawerNav.Screen name="HomeScreen" title='Início' component={Home} options={{ drawerLabel: 'Início' }}/>
                        </DrawerNav.Navigator>
                        )
                }}
            </UserConsumer>
        )
    }

    drawerContent(props) {
        const user = props.value.auth.user
        const isLogged = props.value.auth.isLogged

        return (
            <DrawerContentScrollView {...props} >
                <View style={styles.drawerContent}>
                    <View style={styles.profile}>
                        { isLogged ?
                            <View style={styles.userInfoSection}>
                                <TouchableOpacity onPress={() => { props.navigation.navigate('ProfilePage')}}>
                                    <Avatar.Image source={{uri: `http://192.168.3.103:8000/api/me/_image/profile/${user.photo}`,}} size={80}/>
                                </TouchableOpacity>
                                <Title style={styles.title}>{ user.name}</Title>
                                <Caption style={styles.caption}>{user.group}</Caption>
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
                        { isLogged &&
                            <Drawer.Section style={styles.drawerSection}>
                                <DrawerItem
                                    icon={({ color, size, }) => (
                                        <Icon name="wechat" color={color} size={size}/>
                                    )}
                                    label="Conversas" onPress={() => { props.navigation.navigate('ChatsPage') }}/>
                                {user.group === 'Cliente' &&
                                    <DrawerItem
                                        icon={({ color, size, }) => (
                                            <Icon name="rocket" color={color} size={size}/>
                                        )}
                                        label="Minhas solicitações" onPress={() => { props.navigation.navigate('SolicitationsStatusPage') }}/>
                                }
                                {user.group === 'Prestador' &&
                                    <DrawerItem
                                        icon={({ color, size, }) => (
                                            <Icon name="plus" color={color} size={size}/>
                                        )}
                                        label="Cadastrar oferta de Serviço" onPress={() => { props.navigation.navigate('CreateOfferPage') }}/>
                                }
                                {user.group === 'Prestador' &&
                                    <DrawerItem
                                        icon={({ color, size, }) => (
                                            <Icon name="suitcase" color={color} size={size}/>
                                        )}
                                        label="Serviços em andamento" onPress={() => { props.navigation.navigate('ProgressOfWorksPage') }}/>
                                }
                                {user.group === 'Prestador' &&
                                    <DrawerItem
                                        icon={({ color, size, }) => (
                                            <Icon name="info-circle" color={color} size={size}/>
                                        )}
                                        label="Chamados" onPress={() => { props.navigation.navigate('RequestsWorksPage') }}/>
                                }
                            </Drawer.Section>
                        }

                        {/*<Drawer.Section title="Preferências">*/}
                        {/*    <TouchableRipple onPress={() => {}}>*/}
                        {/*        <View style={styles.preference}>*/}
                        {/*            <Text>Notificações</Text>*/}
                        {/*            <View pointerEvents="none">*/}
                        {/*                <Switch value={false} />*/}
                        {/*            </View>*/}
                        {/*        </View>*/}
                        {/*    </TouchableRipple>*/}
                        {/*</Drawer.Section>*/}
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
