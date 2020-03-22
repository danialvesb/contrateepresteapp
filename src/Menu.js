import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar } from "react-native-elements"
import AsyncStorage from '@react-native-community/async-storage';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import Home from './screens/Home'

const Drawer = createDrawerNavigator();

const getUserData = async () => {
    let userData
    try {
        userData = await AsyncStorage.getItem('user_auth_token')
    }catch(err) {

    }
    return await  userData
}

const isLogged = async () => {
    let userData
    try {
        userData = await AsyncStorage.getItem('userData')
    }catch(err) {
        // userData não tem token, inválido
    }
    if (userData) {
        this.setState({isLogged: true})
    }else {
        this.setState({isLogged: false})
    }

}

const initialState = {
    userName: '',
    isLogged: false,
}

class MyDrawer extends Component {

    render() {
        return (
            <Drawer.Navigator  drawerContent={props => <CustomDrawerContent {...props} />}   drawerStyle={{ backgroundColor: '#FFF', width: 300, flexDirection: 'row', textAlign: 'center' }}>
                <Drawer.Screen name="HomeScreen" component={Home} options={{ drawerLabel: 'Início' }}/>
            </Drawer.Navigator>
        )
    }
}

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <View>
                {isLogged ?
                    <Avatar
                        size="large"
                        rounded
                        title="MT"
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                        containerStyle={{alignSelf: 'center', margin: 5}}
                    /> :
                    <DrawerItem
                        label="Entre na sua conta"
                        onPress={() => props.navigation.navigate('AuthPage')}
                    />
                }
                <TouchableOpacity onPress={() => console.log(getUserData())}><Text>Teste</Text></TouchableOpacity>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

export default () =>  <MyDrawer />
