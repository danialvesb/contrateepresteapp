import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

export  default props => {
    return (
        <View style={ styles.container }>
            <View style={styles.content}>
                <View style={styles.data}>
                    <Text style={{fontSize: 20, color: 'rgba(36,41,46,0.76)'}}>Concerto de imoveis</Text>
                    <Text style={{fontSize: 20, color: 'rgba(36,41,46,0.76)'}}>Goiânia-GO</Text>
                    <Text style={{fontSize: 20, color: 'rgba(36,41,46,0.76)'}}>Qualificações</Text>
                    <Text style={{fontSize: 20, color: 'rgba(36,41,46,0.76)'}}>Preço do serviço</Text>
                </View>
                <View style={styles.options}>
                    <TouchableOpacity style={{backgroundColor: 'rgba(36,41,46,0.35)', margin: 1, alignItems: 'center', justifyContent: 'center'}}><Text style={{fontSize: 20}}>Solicitar</Text></TouchableOpacity>
                </View>

                <View style={styles.description}>
                    <Text style={{fontSize: 20, color: 'rgba(36,41,46,0.76)', flex: 5}}>Descrição</Text>
                </View>
            </View>
            </View>
    )
}

const styles = StyleSheet.create({
    header: {
        margin: 2,
        padding: 5,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.33)'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'

    },
    content: {
        borderWidth: 0.5,
        borderColor: 'rgb(36, 41, 46)',
        width: '95%',
        height: '80%',
        margin: 5,
        borderRadius: 4,
        flexDirection: 'row',
        flexWrap: 'wrap'

    },
    data: {
        borderWidth: 0.5,
        borderColor: 'rgb(36, 41, 46)',
        width: '70%',
        height: '70%',
        margin: 5,
        borderRadius: 4,
    },
    options: {
        flex: 2,
        borderWidth: 0.5,
        borderColor: 'rgb(36, 41, 46)',
        width: '70%',
        height: '20%',
        margin: 5,
        borderRadius: 4,

    },
    description: {

        borderWidth: 0.5,
        borderColor: 'rgb(36, 41, 46)',
        width: '70%',
        height: '20%',
        margin: 5,
        borderRadius: 4,


    }
})
