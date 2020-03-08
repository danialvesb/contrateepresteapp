import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import commonStyles from '../commonStyles';

export default props => {
    return (
        <View style={styles.header} >
            <View style={styles.topHeader}>
                <Text style={styles.title}>Pesquisa</Text>
            </View>
            <View style={styles.filtersHeader}>
                <Text style={styles.title}>Cateogria e filtros gerais</Text>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
    },
    topHeader: {
        flex: 1,
        backgroundColor: '#000'
    },
    filtersHeader: {
        flex: 1,
        backgroundColor: '#80bbe7'
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
