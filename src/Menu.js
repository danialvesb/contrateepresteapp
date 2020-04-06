import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar } from "react-native-elements"
import AsyncStorage from '@react-native-community/async-storage';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import Home from './screens/Home'
import {showError} from './common';

const Drawer = createDrawerNavigator();

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
            <Drawer.Navigator  drawerContent={props => <CustomDrawerContent {...props} isLogged={this.state.isLogged} />} drawerStyle={{ backgroundColor: '#FFF', width: 300, flexDirection: 'row', textAlign: 'center'}}>
                <Drawer.Screen name="HomeScreen" component={Home} options={{ drawerLabel: 'Início' }}/>
            </Drawer.Navigator>
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

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props} >
            <View style={styles.profile}>
                {props.isLogged ?
                    <View>
                        <View>
                            <Avatar
                                size="large"
                                rounded
                                title="MT"
                                // onPress={() => props.navigation.navigate('ManagerProfile')}
                                activeOpacity={0.7}
                                containerStyle={{alignSelf: 'center', margin: 5}}/>
                        </View>
                        <View style={{alignSelf: 'center', margin: 5, padding: 15}}>
                            <TouchableOpacity onPress={ () => logout() }><Text style={{fontSize: 15}}>Sair</Text></TouchableOpacity>
                        </View>

                    </View>
                    :
                    <View>
                        <DrawerItem
                            label="Entre na sua conta"
                            onPress={() => props.navigation.navigate('AuthPage')}
                        />
                    </View>

                }
            </View>

            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

export default () =>  <MyDrawer />

const styles = StyleSheet.create({
    profile: {

    }
})
