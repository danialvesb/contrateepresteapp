import React, { Component } from 'react'
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
import ProgressOfWorks from './screens/provider/ProgressOfWorks'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import {server} from './common'
import Chat from './components/chat/ChatMain'
import Chats from './components/chat/Chats'
import PhotoCamera from './components/Camera/PhotoCamera'
import TakeOrChoosePhoto from './components/Modals/TakeOrChoosePhoto'
import EvaluateService from './components/Modals/EvaluateService';

const Stack = createStackNavigator()
const initialState = {
    auth: {
        isLogged: false,
        user: {},
        setNewContext: {}
    }
}

export const UserContext = React.createContext()

export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer

export default class Navigator extends Component{
    state = {
        ...initialState,
    }

    componentDidMount = async () => {
        const setNewContext = (auth) => {
            const authNew = {
                isLogged: auth.isLogged,
                user: auth.user,
                setNewContext: setNewContext
            }

            this.setState({
                auth: authNew
            })
        }
        const { auth } = this.state
        auth.setNewContext = setNewContext
        this.setState({auth: auth})

        await this.meValidateToken(setNewContext)
    }

    render() {
        const { auth } = this.state

        return (
            <NavigationContainer>
                <UserProvider value={{auth}}>
                    <Stack.Navigator initialRouteName="Menu" headerMode='screen'>
                        <Stack.Screen name="Menu" component={ Menu } initialParams={{ isLogged: this.state.isLogged, user: this.state.user }} options={{ headerShown: false }}/>
                        <Stack.Screen name="Offer" component={ Offer }/>
                        <Stack.Screen name="Camera" component={ PhotoCamera } options={{ headerShown: false }}/>
                        <Stack.Screen name="TakeOrChoosePhoto" component={ TakeOrChoosePhoto } options={{ headerShown: false }}/>
                        <Stack.Screen name="OffersList" component={ OffersList }/>
                        <Stack.Screen name="OfferInfosPage" component={ OfferInfos } options={{ headerTitle:'Informações'}}/>
                        <Stack.Screen name="CreateOfferPage" component={ CreateOffer } options={{ headerShown: true, headerTitle: 'Criar oferta de serviço'}}/>
                        <Stack.Screen name="SolicitationsStatusPage" component={ Solicitations } options={{ headerShown: true, headerTitle: 'Andamento das solicitações' }}/>
                        <Stack.Screen name="SolicitationStatusPage" component={ Solicitation } options={{ headerShown: true }}/>
                        <Stack.Screen name="RequestsWorksPage" component={ RequestsWorks } options={{ headerShown: true, headerTitle: 'Chamados de serviços' }}/>
                        <Stack.Screen name="ProgressOfWorksPage" component={ ProgressOfWorks } options={{ headerShown: true, headerTitle: 'Meus seviços' }}/>
                        <Stack.Screen name="AuthPage" component={ Auth } options={{ headerShown: true, headerTitle: 'Entre ou Cadastre-se' }}/>
                        <Stack.Screen name="ProfilePage" component={ Profile } options={{ headerShown: true, headerTitle: 'Perfil' }}/>
                        <Stack.Screen name="ChatPage" component={ Chat } options={{ headerShown: true, headerTitle: 'Conversa' }}/>
                        <Stack.Screen name="ChatsPage" component={ Chats } options={{ headerShown: true, headerTitle: 'Conversas' }}/>
                        <Stack.Screen name="EvaluateServicePage" component={ EvaluateService } options={{ headerShown: false }}/>
                    </Stack.Navigator>
                </UserProvider>
            </NavigationContainer>
        )
    }

    async meValidateToken(setNewContext) {
        const access_token = await AsyncStorage.getItem('access_token')
        if (access_token) {
            try {
                const responseRec = await axios({
                    method: 'post',
                    url: `${server}/auth/me`,
                    headers: {
                        'Authorization': `bearer ${access_token}`
                    },
                })
                const authNew = {
                    isLogged: true,
                    user: responseRec.data,
                    setNewContext: setNewContext
                }
                this.setState({
                    auth: authNew
                })
            }catch(err) {
                if (access_token)
                    await AsyncStorage.removeItem('access_token')
            }
        }
    }
}


