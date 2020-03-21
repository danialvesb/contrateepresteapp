import * as React from 'react'
import Home from './screens/Home'
import Auth from './screens/Auth'
import OfferWorkList from './components/OfferWorkList'
import Menu from './Menu'
import RequestWork from './screens/RequestWork'
import { createDrawerNavigator } from '@react-navigation/drawer'
// createDrawerNavigator()
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import OfferWorkNav from './components/OfferWork'

const Stack = createStackNavigator();

export  default () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Menu" headerMode='none'>
                <Stack.Screen name="Menu" component={ Menu } />
                <Stack.Screen name="OfferWork" component={ OfferWorkNav } />
                <Stack.Screen name="OfferWorkList" component={ OfferWorkList }/>
                <Stack.Screen name="AuthPage" component={ Auth } />
                <Stack.Screen name="RequestWorkPage" component={ RequestWork }/>
            </Stack.Navigator>
            {/*<Drawer.Navigator  drawerContent={props => <CustomDrawerContent {...props} />}>*/}
            {/*    <Drawer.Screen name="InÍcio" component={Home}/>*/}
            {/*</Drawer.Navigator>*/}
        </NavigationContainer>
    )
}
