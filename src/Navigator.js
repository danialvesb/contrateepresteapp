import * as React from 'react'
import Auth from './screens/Auth'
import OffersList from './components/OffersList'
import Menu from './Menu'
import OfferInfos from './screens/OfferInfos'
import Offer from './components/Offer'
import Solicitations from './screens/client/Solicitations'
import RequestsWorks from './screens/provider/RequestsWorks'
import CreateOffer from './screens/provider/CreateOffer'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Solicitation from './screens/client/Solicitation';

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
                <Stack.Screen name="Offer" component={ Offer }/>
                <Stack.Screen name="OffersList" component={ OffersList }/>
                <Stack.Screen name="OfferInfosPage" component={ OfferInfos } options={{ headerTitle:'Informações'}}/>
                <Stack.Screen name="CreateOfferPage" component={ CreateOffer } options={{ headerShown: true }}/>
                <Stack.Screen name="SolicitationsStatusPage" component={ Solicitations } options={{ headerShown: true }}/>
                <Stack.Screen name="SolicitationStatusPage" component={ Solicitation } options={{ headerShown: true }}/>
                <Stack.Screen name="RequestsWorksPage" component={ RequestsWorks } options={{ headerShown: true }}/>
                <Stack.Screen name="AuthPage" component={ Auth } options={{ headerShown: true }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
