import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import commonStyles from '../commonStyles'

export default props => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerInfors}>
                    <Text style={styles.textHeader}> { props.name } </Text>
                    <Text style={styles.textHeader}> { props.locale } </Text>
                    <Text style={styles.textHeader}> { props.district } </Text>
                </View>
                <Text style={styles.textHeaderIcon}>
                    <Icon name="star" size={25} color="rgb(240, 208, 13)" />
                    { props.rating }
                </Text>
            </View>
            <View style={styles.content}>

                <Text style={styles.textContent}> { props.typeOffer } </Text>
            </View>


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        elevation: 2,
        margin: 3,
        height: 200,
        borderRadius: 8,

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
        flexDirection: 'row',
        // backgroundColor: '#FFF',
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