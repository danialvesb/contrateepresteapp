import React from 'react'
import {View, Text, StyleSheet, Picker} from 'react-native';
import commonStyles from '../commonStyles';

export default props => {
    return (
        <View style={styles.filters} >
            <View style={styles.dropDown}>
                <Picker selectedValue={props.selectedValueCategory}
                        style={{color: '#000'}} mode={'dropdown'}
                        onValueChange={(selectedValue, itemIndex) => props.setSelectedValueCategory(selectedValue)}>
                    <Picker.Item label={'Pesquisar por categoria'} value={0} />
                    {props.categoriesData &&
                        props.categoriesData.map((item, index) => (
                            <Picker.Item key={item.id} label={item.title} value={item.id} />
                        )
                        )
                    }
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
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
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
