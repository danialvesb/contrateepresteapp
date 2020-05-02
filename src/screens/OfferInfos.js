import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RequestOfferConfirm from '../components/Modals/RequestOfferConfirm';

export  default function OfferInfos({ route, navigation }) {
    const { data } = route.params

    return (
        <View style={ styles.container }>
            <View style={styles.content}>
                <View style={styles.data}>
                    <Text style={{fontSize: 20, color: 'rgba(36,41,46,0.76)'}}>{ data.service_title }</Text>
                    <Text style={{fontSize: 20, color: 'rgba(36,41,46,0.76)'}}>{ `${data.city} / ${data.uf} ` }</Text>
                    <Text style={{fontSize: 20, color: 'rgba(36,41,46,0.76)'}}>Qualificações</Text>
                    <Text style={{fontSize: 20, color: 'rgba(36,41,46,0.76)'}}>V/H: { data.amount }</Text>
                </View>
                <View style={styles.options}>
                    <View>
                        <RequestOfferConfirm navigation={navigation} data={data}></RequestOfferConfirm>
                    </View>
                </View>

                <View style={styles.description}>
                    <Text style={{fontSize: 15 , color: 'rgba(36,41,46,0.76)', flex: 5}}>{data.description}</Text>
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
        borderColor: 'rgb(36, 41, 46)',
        width: '70%',
        height: '70%',
        margin: 5,
        borderRadius: 4,
    },
    options: {
        flex: 2,
        width: '70%',
        height: '20%',
        margin: 5,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        borderWidth: 0.5,
        borderColor: 'rgb(36, 41, 46)',
        width: '70%',
        height: '20%',
        margin: 5,
        borderRadius: 4,
    },
})
