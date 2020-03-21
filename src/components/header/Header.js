import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Filters from '../Filters';
import { CustomDrawerContent } from '../../Menu';
import Search from './Search';


export  default props =>
    <View style={styles.container}>
        <View style={styles.menu}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => props.navigate.openDrawer()} >
                    <View style={{margin: 10, }}>
                        <Icon name="bars" size={30} color="#FFF" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{flex: 5 }}>
                <Search></Search>
            </View>

        </View>
        <View style={styles.searchs}>
            <Filters></Filters>
        </View>
    </View>



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
    home: {

    },
    search: {

    },
    selectCategory: {

    }
})
