import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native';
import Work from '../../components/Offer';

export default props => {
    return (
        <View style={styles.containerStyle}>
            <View style={styles.offferStyles}>
                <Text>Pintura de casas redireciona para a oferta</Text>
                <Text>redireciona para a oferta</Text>
            </View>
            <View style={styles.serviceStyle}>
                <Text>Olá eu gostaria de fazer um orçameno para uma obra na minha casa!</Text>
            </View>
            <View style={styles.categoryStyle}>
                <Text>Imagem</Text>

            </View>
            <View style={styles.offerDetailsStyles}>
                <Text>Status(Aguardando/caso tenha sido negado vai ser avisado)</Text>
            </View>
            <View style={styles.statusSolicitation}>
                <Text>Icone ou texto que clicando vai para o chat</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'rgba(249,249,249,0.55)',
        width: '100%',
        height: '100%'
    },
    offferStyles: {

    },
    serviceStyle: {

    },
    categoryStyle: {

    },
    offerDetailsStyles: {

    },
    statusSolicitation: {

    }
})
