import * as React from 'react'
import Auth from './screens/Auth'
import OfferWorkList from './components/OfferWorkList'
import Menu from './Menu'
import RequestWork from './screens/RequestWork'
import OfferWork from './components/OfferWork';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

const headerStyle = () => {
    return ({ scene, previous, navigation }) => {
        const { options } = scene.descriptor;
        const title =
            options.headerTitle !== undefined
                ? options.headerTitle
                : options.title !== undefined
                ? options.title
                : scene.route.name

    }
}


export  default () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Menu" headerMode='screen'>
                <Stack.Screen name="Menu" component={ Menu } options={{ headerShown: false }}/>
                <Stack.Screen name="OfferWork" component={ OfferWork }/>
                <Stack.Screen name="OfferWorkList" component={ OfferWorkList }/>
                <Stack.Screen name="AuthPage" component={ Auth } />
                <Stack.Screen name="RequestWork" component={ RequestWork } options={{ headerTitle:'Informações'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
