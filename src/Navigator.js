import * as React from 'react';
import Home from './screens/Home'
import Auth from './screens/Auth'
import Menu from './Menu'
import RequestWork from './screens/RequestWork'
import { createDrawerNavigator } from '@react-navigation/drawer';
// createDrawerNavigator()
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

export  default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="RequestWorkPage" headerMode='none'>
                <Stack.Screen name="Menu" component={ Menu } />
                <Stack.Screen name="AuthPage" component={ Auth } />
                <Stack.Screen name="RequestWorkPage" component={ RequestWork } />
            </Stack.Navigator>
            {/*<Drawer.Navigator  drawerContent={props => <CustomDrawerContent {...props} />}>*/}
            {/*    <Drawer.Screen name="InÍcio" component={Home}/>*/}
            {/*</Drawer.Navigator>*/}
        </NavigationContainer>
    );
}
