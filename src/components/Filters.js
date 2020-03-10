import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import commonStyles from '../commonStyles';

export default props => {
    return (
        <View style={styles.filters} >
            <View style={styles.search}>
                <Text style={styles.title}>Pesquisa</Text>
            </View>
            <View style={styles.filterSelect}>
                <Text style={styles.title}>Filtros gerais</Text>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    filters: {
        flex: 1,
        flexDirection: 'row'
    },
    search: {
        flex: 1,
        backgroundColor: 'rgba(128,187,231,0.4)',
        flexDirection: 'row'
    },
    filterSelect: {
        flex: 1,
        backgroundColor: '#80bbe7',
        flexDirection: 'row'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: commonStyles.colors.secondary,
        marginLeft: 15,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 10,
        marginBottom: 10

    }
})
