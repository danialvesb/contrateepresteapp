import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import commonStyles from '../commonStyles'
import {Divider} from 'react-native-paper';

export default props => {
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('OfferInfosPage', { data: props.data})}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerInfors}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.textContent}> { props.typeOffer } </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.textHeader}> { props.locale } / { props.district }</Text>
                        </View>
                        <Divider />
                    </View>
                    <Text style={styles.textHeaderIcon}>
                        <Icon name="star" size={25} color="rgb(240, 208, 13)" />
                        { props.rating }
                    </Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.textHeader}> { `${props.name}` }<Text style={{fontSize: 10, fontWeight: 'bold'}}>(Nome do profissional)</Text></Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderColor: '#556686',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        margin: 3,
        height: 200,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    header: {
        flex: 3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
        height: '50%',
        width: '100%',
        // backgroundColor: '#000'
    },
    headerInfors: {
        flex: 6,
        flexDirection: 'column',
    },
    textHeader: {
        flex: 1,
        fontSize: 15,
        flexDirection: 'row',
        fontFamily: commonStyles.fontFamily,
    },
    textHeaderIcon: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: '#ffe055'
        fontFamily: commonStyles.fontFamily,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: '50%',
        padding: 5
    },
    textContent: {
        flex: 3,
        flexDirection: 'row',
        textAlign: 'center',
        fontSize: 30,
        fontFamily: commonStyles.fontFamily,
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5
    }
})
