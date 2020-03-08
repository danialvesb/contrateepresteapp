import React, { Component, NativeAppEventEmitter } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './screens/Home';
import Auth from './screens/Auth';

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Login" component={Auth} />
            <Drawer.Screen name="Inicio" component={Home} />
        </Drawer.Navigator>
    );
}

export default class MyBackButton extends Component {
    render() {
        return (
            <NavigationContainer>
                <MyDrawer />
            </NavigationContainer>
        )
    }
}

