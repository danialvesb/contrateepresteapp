import * as React from 'react';
import Home from './screens/Home'
import Auth from './screens/Auth'
import Menu from './Menu'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

export  default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Menu">
                <Stack.Screen name="Menu" component={ Menu } />
                <Stack.Screen name="Home" component={ Home } />
                <Stack.Screen name="AuthPage" component={ Auth } />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
