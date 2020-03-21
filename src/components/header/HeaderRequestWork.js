import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'


export  default props => {
    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                    <Text style={{fontSize: 20, color: 'rgba(36,41,46,0.76)', flex: 5}}>Informações</Text>
                    <TouchableOpacity style={{backgroundColor: 'rgba(36,41,46,0.35)', flex: 1, margin: 1, alignItems: 'center', justifyContent: 'center'}}><Text>Voltar</Text></TouchableOpacity>
            </View>

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'

    },
    nav: {
        margin: 2,
        padding: 5,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.33)'

    },
})
