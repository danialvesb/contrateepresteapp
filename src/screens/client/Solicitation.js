import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default props => {
    return (
        <View style={styles.containerStyle}>
            <View style={styles.bodyStyle}>
                <View style={styles.left}>
                    <Icon name="clock-o" color='#FFC925' size={80}/>
                </View>

                <View style={styles.rigth}>
                    {/*<Icon name="eye" color='#50B767' size={30}/>*/}

                    <Text>Pintura de casas</Text>
                    <Text>100.99</Text>

                </View>
                {/*<View style={styles.serviceStyle}>*/}
                {/*    <Text>Olá eu gostaria de fazer um orçameno para uma obra na minha casa!</Text>*/}
                {/*</View>*/}
                {/*<View style={styles.categoryStyle}>*/}
                {/*    <Text>Imagem</Text>*/}

                {/*</View>*/}
                {/*<View style={styles.offerDetailsStyles}>*/}
                {/*    <Text>Status(Aguardando/caso tenha sido negado vai ser avisado)</Text>*/}
                {/*</View>*/}
                {/*<View style={styles.statusSolicitation}>*/}
                {/*    <Text>Icone ou texto que clicando vai para o chat</Text>*/}
                {/*</View>*/}
            </View>
            <View style={styles.footer}>
                <Text>Olá boa tarde, como vai o senhor, eu estava olhando sua oferta de trabalho e achei bem interessante, gostaria de combinar com você o melhor dia para um orçamento.</Text>
            </View>
            <View style={styles.files}>
                <Text>Arquivos</Text>
                <ScrollView horizontal={true}>
                    <TouchableOpacity style={styles.itemFIleScrool}>
                        <Icon name="clock-o" color='#FFC925' size={80}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemFIleScrool}>
                        <Icon name="clock-o" color='#FFC925' size={80}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemFIleScrool}>
                        <Icon name="clock-o" color='#FFC925' size={80}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemFIleScrool}>
                        <Icon name="clock-o" color='#FFC925' size={80}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemFIleScrool}>
                        <Icon name="clock-o" color='#FFC925' size={80}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemFIleScrool}>
                        <Icon name="clock-o" color='#FFC925' size={80}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemFIleScrool}>
                        <Icon name="clock-o" color='#FFC925' size={80}/>
                    </TouchableOpacity>


                </ScrollView>
            </View>

            <View style={styles.buttons}>
                <TouchableOpacity style={styles.buttonStyle}>
                    <Text style={{ fontSize: 15, color: '#FFF'}}>Cancelar solicitação</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#FFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        padding: 2,
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
        height: 350
    },
    bodyStyle: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    left: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        marginTop: 1,
    },
    rigth: {
        flex: 3,
        padding: 2,
    },
    footer: {
        flex: 1,
        marginTop: 9,
        padding: 1,
        borderWidth: 1,
        borderColor: 'rgba(26,21,21,0.23)',
        borderRadius: 4
    },
    files: {
        margin: 4,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: 'rgba(26,21,21,0.23)',
    },
    itemFIleScrool: {
        margin: 3,
        padding: 3
    },
    buttonStyle: {
        backgroundColor: 'red',
        padding: 4,
        margin: 5,
        borderRadius: 10,
        width: '50%'
    },
    buttons: {

    }
})
