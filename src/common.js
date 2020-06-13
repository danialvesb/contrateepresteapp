import {Alert, Platform} from 'react-native'
import React from 'react'

const server = Platform.OS == 'ios' ? 'http://localhost:3000' : 'http://192.168.3.103:8000/api'

function showError(err) {
    Alert.alert('Ops! Ocorreu um Problema!', `${err}`)
}

function showSuccess(msg) {
    Alert.alert(msg)
}
function showSuccessRequest(title, message) {
    Alert.alert(title, message)
}
function showMessage(msg) {
    Alert.alert('Atenção!', msg)
}

export { server, showError, showSuccess, showMessage, showSuccessRequest }




