// import React, { Component } from 'react'
// import { View, ActivityIndicator, StyleSheet } from 'react-native'
// import axios from 'axios'
// import AsyncStorage from '@react-native-community/async-storage'
//
// export default class AuthOrApp extends Component {
//
//     componentDidMount = async () => {
//         const userDataJson = await AsyncStorage.getItem('userData')
//         let userData = null
//
//         try {
//             userData = JSON.parse(userDataJson)
//         }catch(err) {
//             // userData não tem token, inválido
//         }
//
//         if(userData && userData.access_token) {
//             axios.defaults.headers.common['Authorization'] = `bearer ${userData.access_token}`
//             this.props.navigation.navigate('Home', userData)
//
//         } else {
//             this.props.navigation.navigate('Auth')
//         }
//     }
//
//     render() {
//         return (
//             <View style={styles.container}>
//                 <ActivityIndicator size='large'></ActivityIndicator>
//             </View>
//         )
//     }
// }
//
// Essa tela decide se existe um token valido e então dereciona para a tela que o usuário requisitou e caso não tenha direciona para a tela de login
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center', //main axis
//         alignItems: 'center', //cross axis
//         backgroundColor: '#000'
//     }
// })
