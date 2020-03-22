import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from "react-native-elements";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Home from './screens/Home';

const Drawer = createDrawerNavigator();

const isLogged = async () => {
    const userDataJson = await AsyncStorage.getItem('userData')
    let userData = null

    try {
        userData = JSON.parse(userDataJson)
    }catch(err) {
        // userData não tem token, inválido
    }
    if(userData && userData.access_token) {
        return true
    }else {
        return false
    }
}

function MyDrawer() {
    return (
        <Drawer.Navigator  drawerContent={props => <CustomDrawerContent {...props} />}   drawerStyle={{ backgroundColor: '#FFF', width: 300, flexDirection: 'row', textAlign: 'center' }}>
            <Drawer.Screen name="HomeScreen" component={Home} options={{ drawerLabel: 'Início' }}/>
        </Drawer.Navigator>
    );
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
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

export default () =>  <MyDrawer />
