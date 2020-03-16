import React from 'react';
import {View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Filters from '../Filters';
import { CustomDrawerContent } from '../../Menu';

export  default () =>
    <View style={styles.container}>
        <View style={styles.menu}>
            <TouchableOpacity onPress={() => console.log("press!")}>
                <View style={{margin: 10, }}>
                    <Icon name="bars" size={30} color="#FFF" />
                </View>
            </TouchableOpacity>

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
        justifyContent: 'center',
        backgroundColor: '#2e1216'
    },
    home: {

    },
    search: {

    },
    selectCategory: {

    }
})
