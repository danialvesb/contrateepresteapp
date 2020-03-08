import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Home from './screens/Home'
import Auth from './screens/Auth'
import AuthOrApp from './screens/AuthOrApp'


const mainRoutes = {
    Auth: {
        name: 'Auth',
        screen: Auth
    },
    Home: {
        name: 'Home',
        screen: Home
    },
    AuthOrApp: {
        name: 'AuthOrApp',
        screen: AuthOrApp
    },
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'AuthOrApp'
})

export default createAppContainer(mainNavigator)
