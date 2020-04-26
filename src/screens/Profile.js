import React, { Component } from 'react';
import {View, StyleSheet, ScrollView, Text, TouchableOpacity} from 'react-native';
import {Avatar, Caption} from 'react-native-paper';

const initialState = {
    name: 'Daniel Alves',
    email: 'daniel@gmail.com',
    password: '12345678',
    mobile: '9229292929',
    city: 'Goiânia',
    uf: 'Goiás',
    district: 'Parque tremendão',
    typeAccount: 'Prestador',
}

export default class Profile extends Component{
    state = {
        ...initialState
    }

    render(): React.ReactNode {
        return (
            <View style={styles.containerStyle}>
                <ScrollView>
                    <View style={styles.headerStyle}>
                        <Avatar.Image source={{uri: 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',}} size={80}/>
                    </View>
                    <View style={styles.contentStyle}>
                        <View style={styles.containerStyleText}>
                            <Text style={styles.labelStyleText}>{ this.state.name }</Text>
                        </View>
                        <View style={styles.containerStyleCaption}>
                            <Caption style={styles.labelStyleCaption}>{ this.state.email }</Caption>
                            <Caption style={styles.labelStyleCaption}>{ this.state.mobile }</Caption>
                            <Caption style={styles.labelStyleCaption}>{ this.state.city }</Caption>
                            <Caption style={styles.labelStyleCaption}>{ this.state.uf }</Caption>
                            <Caption style={styles.labelStyleCaption}>{ this.state.district }</Caption>
                            <Caption style={styles.labelStyleCaption}>{ this.state.typeAccount }</Caption>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.buttonStyleAcept}>
                            <Text style={{ fontSize: 15, color: '#FFF', textAlign: 'center'}}>Editar informações</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonStyleRecuse}>
                            <Text style={{ fontSize: 15, color: '#FFF', textAlign: 'center'}}>Sair</Text>
                        </TouchableOpacity>
                    </View>


                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        width: '100%',
        height: '100%',
    },
    headerStyle: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(36, 41, 46)'
    },
    containerStyleText: {
        alignItems: 'center'
    },
    containerStyleCaption: {
        width: '90%',
        padding: 3
    },
    labelStyleText: {
        borderBottomWidth: 1,
        borderColor: 'rgba(36,41,46,0.23)',
        fontSize: 24,
        width: '50%',
    },
    labelStyleCaption: {
        borderBottomWidth: 1,
        borderColor: 'rgba(36,41,46,0.23)',
        fontSize: 20,
        marginTop: 20
    },
    footer: {
        flex: 1,
        margin: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyleAcept: {
        width: '50%',
        backgroundColor: 'rgb(36, 41, 46)',
        padding: 10,
        margin: 1,
    },
    buttonStyleRecuse: {
        width: '50%',
        backgroundColor: 'rgba(191,12,48,0.76)',
        padding: 10,
        margin: 1,
    },

})
