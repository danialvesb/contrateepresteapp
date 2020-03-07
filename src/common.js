import { Alert, Platform } from 'react-native'


const server = Platform.OS == 'ios'
    ? 'http://localhost:3000' : 'http://192.168.3.103:8000/api'

    
function showError(err) {
    Alert.alert('Ops! Ocorreu um Problema!', ` Mensagem ${err}`)
    // Alert.alert('Ops! Ocorreu um Problema!', ` Mensagem ${err.message}`)
}

function showSuccess(msg) {
    Alert.alert('Sucesso!', msg.message)
}




export { server, showError, showSuccess }




