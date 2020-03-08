import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import OfferWorkList from './screens/OfferWorkList'
import Auth from './screens/Auth'
import AuthOrApp from './screens/AuthOrApp'

const mainRoutes = {
    Auth: {
        name: 'Auth',
        screen: Auth
    },
    Home: {
        name: 'Home',
        screen: OfferWorkList
    },
    AuthOrApp: {
        name: 'AuthOrApp',
        screen: AuthOrApp
    }
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'AuthOrApp'
})

export default createAppContainer(mainNavigator)
