import React from 'react';
import {View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Filters from '../Filters';
import { CustomDrawerContent } from '../../Menu';

export  default () =>
    <View style={styles.header}>
        <View style={styles.menu}>
            <TouchableOpacity>
                <Icon name="bars" size={25} color="#FFF" />
            </TouchableOpacity>

        </View>
        <View style={styles.searchs}>
            <Filters></Filters>
        </View>
    </View>



const styles = StyleSheet.create({
    header: {
        flex: 10
    },
    searchs: {
        flex: 1
    },
    menu: {
        flex: 1,
        backgroundColor: '#2e1216'
    },
    home: {

    },
    search: {

    },
    selectCategory: {

    }
})
