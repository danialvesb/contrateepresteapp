import * as React from 'react'
import Auth from './screens/Auth'
import OffersList from './components/OffersList'
import Menu from './Menu'
import OfferInfos from './screens/OfferInfos'
import Offer from './components/Offer'
import Solicitations from './screens/client/Solicitations'
import CreateOffer from './screens/provider/CreateOffer'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Solicitation from './screens/client/Solicitation'
import Profile from './screens/Profile'
import RequestsWorks from './screens/provider/RequestsWorks'
const Stack = createStackNavigator()
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

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

// axios.interceptors.request.use(async (config) => {
//     if (
//         !config.url.endsWith('login') ||
//         !config.url.endsWith('refresh') ||
//         !config.url.endsWith('signup')
//     ) {
//         const userTokenExpiration = new Date(await AsyncStorage.getItem('userTokenExpiration'));
//         const today = new Date();
//         if (today > userTokenExpiration) {
//             // refresh the token here
//             const userRefreshToken = await AsyncStorage.getItem('userRefreshToken');
//         } else {
//             const userToken = await AsyncStorage.getItem('userToken');
//             config.headers.Authorization = `Bearer ${userToken}`;
//         }
//     }
//
//     return config;
// }, (error) => {
//     // I cand handle a request with errors here
//     return Promise.reject(error);
// })

export  default () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Menu" headerMode='screen'>
                <Stack.Screen name="Menu" component={ Menu } options={{ headerShown: false }}/>
                <Stack.Screen name="Offer" component={ Offer }/>
                <Stack.Screen name="OffersList" component={ OffersList }/>
                <Stack.Screen name="OfferInfosPage" component={ OfferInfos } options={{ headerTitle:'Informações'}}/>
                <Stack.Screen name="CreateOfferPage" component={ CreateOffer } options={{ headerShown: true, headerTitle: 'Criar oferta de serviço'}}/>
                <Stack.Screen name="SolicitationsStatusPage" component={ Solicitations } options={{ headerShown: true, headerTitle: 'Status das solicitações' }}/>
                <Stack.Screen name="SolicitationStatusPage" component={ Solicitation } options={{ headerShown: true }}/>
                <Stack.Screen name="RequestsWorksPage" component={ RequestsWorks } options={{ headerShown: true, headerTitle: 'Chamados de serviços' }}/>
                <Stack.Screen name="AuthPage" component={ Auth } options={{ headerShown: true, headerTitle: 'Entre ou Cadastre-se' }}/>
                <Stack.Screen name="ProfilePage" component={ Profile } options={{ headerShown: true, headerTitle: 'Perfil' }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
