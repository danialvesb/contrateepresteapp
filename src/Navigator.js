import * as React from 'react'
import Auth from './screens/Auth'
import WorksList from './components/WorksList'
import Menu from './Menu'
import WorkInfos from './screens/WorkInfos'
import Work from './components/Work'
import Solicitations from './screens/client/Solicitations'
import RequestsWorks from './screens/provider/RequestsWorks'
import CreateOffer from './screens/provider/CreateOffer'
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
                <Stack.Screen name="Work" component={ Work }/>
                <Stack.Screen name="WorksList" component={ WorksList }/>
                <Stack.Screen name="WorkInfosPage" component={ WorkInfos } options={{ headerTitle:'Informações'}}/>
                <Stack.Screen name="CreateOfferPage" component={ CreateOffer } options={{ headerShown: true }}/>
                <Stack.Screen name="SolicitationsStatusPage" component={ Solicitations } options={{ headerShown: true }}/>
                <Stack.Screen name="RequestsWorksPage" component={ RequestsWorks } options={{ headerShown: false }}/>
                <Stack.Screen name="AuthPage" component={ Auth } options={{ headerShown: true }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
