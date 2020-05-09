import React from 'react'
import {View, Text, StyleSheet, Picker} from 'react-native';
import commonStyles from '../commonStyles';

export default props => {
    let category = 0
    return (
        <View style={styles.filters} >
            <View style={styles.dropDown}>
                <Picker selectedValue={ category} style={{color: '#000'}} mode={'dropdown'} pickerStyleType>
                    <Picker.Item label='Filtrar por categoria' value='0' />
                    <Picker.Item label='Pintura' value='1'/>
                    <Picker.Item label='Construção' value='2'/>
                </Picker>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    filters: {
        flex: 1,
    },
    search: {
        flex: 1,
        backgroundColor: 'rgba(128,187,231,0.4)',
        flexDirection: 'row'
    },
    filterSelect: {
        flex: 1,

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
    },
    dropDown: {
        backgroundColor: '#FFF',
        padding: 4,
        width: "100%",
        height: 45,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,

    },

})
