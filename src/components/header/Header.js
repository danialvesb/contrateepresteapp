import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Filters from '../Filters'
import Search from './Search'

export  default props => {
    return (
        <View style={styles.container}>
            <View style={styles.menu}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => props.navigation.openDrawer()} >
                        <View style={{margin: 10, }}>
                            <Icon name="bars" size={30} color="#FFF" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 7 }}>
                    <Search filterListPerText={ (value) => props.filterListPerText(value) } title="Pesquisar..."
                            textSearchValue={props.textSearchValue}/>
                </View>

            </View>
            <View style={styles.searchs}>
                <Filters categoriesData={props.categoriesData}/>
            </View>
        </View>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchs: {
        flex: 1
    },
    menu: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgb(36, 41, 46)'
    },
})
