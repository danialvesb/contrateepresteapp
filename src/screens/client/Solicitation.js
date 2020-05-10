import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Caption} from 'react-native-paper'

export default props => {
    return (
        <View style={styles.containerStyle}>
            <View style={styles.bodyStyle}>
                <View style={styles.left}>
                    {props.data.status === "pending" ?
                        <View>
                            <Icon name="clock-o" color='#FFC925' size={40}></Icon>
                            <Caption style={styles.caption}>Aguardando resposta</Caption>
                        </View>
                        :
                        <TouchableOpacity>
                            <Icon name="send-o" color='#50B767' size={40}/>
                            <Caption style={styles.caption}>Enviar mensagem</Caption>
                        </TouchableOpacity>
                    }
                </View>
                <View style={styles.rigth}>
                    <Text>{props.data.type_service}</Text>
                    <Text>{props.data.amount}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Text>{props.data.solicitation_message}</Text>
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
                </ScrollView>
            </View>
            <View style={styles.timeLineContainer}>
                <View style={styles.timeLine}>
                    <Text style={{ fontSize: 15, color: '#000'}}>Time line-------------------------------------></Text>
                </View>
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
        borderColor: 'rgba(26,21,21,0.23)',
        height: 350
    },
    bodyStyle: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    left: {
        flex: 2,
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
    timeLineContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        margin: 4,
        borderBottomWidth: 1,
        borderColor: 'rgba(26,21,21,0.23)',
    },
    timeLine: {
        flex: 1
    },
    buttons: {

    }
})
