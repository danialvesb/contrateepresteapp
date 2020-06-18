import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Avatar, Caption} from 'react-native-paper'
import EvaluateService from '../../components/Modals/EvaluateService';

export default  props => {
    const { navigation } = props

    return (
        <View style={styles.containerStyle}>
            <View style={styles.bodyStyle}>
                <View style={styles.left}>
                    <Text style={styles.fieldStyle}>{props.data.type_service}</Text>
                    <Text style={styles.fieldStyle}>{props.data.amount}</Text>
                </View>
                <View style={styles.rigth}>
                    {props.data.status === "pending" ?
                        <View>
                            <Icon name="clock-o" color='#FFC925' size={40}></Icon>
                            <Caption>Pendente</Caption>
                        </View>
                        :
                        <TouchableOpacity>
                            {/*<Avatar.Image source={require('../../../assets/icons/message-icon.png')} size={40}/>*/}
                            <Caption>Chat</Caption>
                        </TouchableOpacity>
                    }
                </View>

            </View>
            <View style={styles.footer}>
                <Text style={styles.fieldStyle}>{props.data.solicitation_message}</Text>
            </View>
            <View style={styles.files}>
                <Text style={styles.fieldStyleFielGroup}>Arquivos</Text>
                <ScrollView horizontal={true}>
                    <TouchableOpacity style={styles.itemFIleScrool}>
                        <Icon name="clock-o" color='#FFC925' size={80}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemFIleScrool}>
                        <Icon name="clock-o" color='#FFC925' size={80}/>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            {props.data.status === "pending" &&
                <View style={styles.timeLineContainer}>
                    <View style={styles.timeLineStepOne}>
                        <Text style={styles.textTimeLine}>Pendente</Text>
                    </View>
                </View>
            }
            {props.data.status === "accepted" &&
                <View style={styles.timeLineContainer}>
                    <View style={styles.timeLineStepOne}>
                        <Text style={styles.textTimeLine}>Pendente</Text>
                    </View>
                    <View style={styles.timeLineStepTwo}>
                        <Text style={styles.textTimeLine}>Trabalhando</Text>
                    </View>
                </View>
            }
            {props.data.status === "finished" &&
                <View style={styles.timeLineContainer}>
                    <View style={styles.timeLineStepOne}>
                        <Text style={styles.textTimeLine}>Pendente</Text>
                    </View>
                    <View style={styles.timeLineStepTwo}>
                        <Text style={styles.textTimeLine}>Trabalhando</Text>
                    </View>
                    <View style={styles.timeLineStepThree}>
                        <Text style={styles.textTimeLine}>Finalizado</Text>
                    </View>
                </View>
            }
            <View style={styles.buttons}>
                {props.data.status === "pending" &&
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => props.closeCalled(props.data.id)}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                }
                {props.data.status === "finished" &&
                    <View style={styles.modal}>
                        <EvaluateService navigation={navigation} solicitationId={props.data.id}/>
                    </View>
                }
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
        height: 380
    },
    bodyStyle: {
        flex: 2,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    left: {
        padding: 5,
        margin: 5,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.13)",
        borderRadius: 10
    },
    rigth: {
        padding: 5,
        margin: 5,
    },
    footer: {
        flex: 2,
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
        backgroundColor: '#E75B65',
        padding: 4,
        margin: 5,
        borderRadius: 10,
        width: '45%',
        height: "70%",
        justifyContent: "center",
        alignItems: "center"
    },
    timeLineContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '97%',
        margin: 4,
        borderBottomWidth: 1,
        borderColor: 'rgba(26,21,21,0.23)',
    },
    timeLineStepOne: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "#FF9431",
        width: "33%",
        height: 25
    },
    timeLineStepTwo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "#34B2E4",
        width: "33%",
        height: 25
    },
    timeLineStepThree: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: "#69DAAC",
        width: "33%",
        height: 25
    },
    buttons: {
        flex: 1
    },
    buttonText: {
        fontFamily: "Montserrat-Regular",
        fontWeight: "400",
        color: "#FFF"
    },
    fieldStyle: {
        fontFamily: "Montserrat-Regular",
        fontWeight: "400"
    },
    fieldStyleBold: {
        fontFamily: "Montserrat-SemiBold",
        fontWeight: "400"

    },
    fieldStyleFielGroup: {
        fontFamily: "Montserrat-Regular",
        fontWeight: "400",
    },
    caption: {
        fontFamily: "Montserrat-Regular",
        fontWeight: "400",
    },
    textTimeLine: {
        color: "#FFF",
        fontFamily: "Montserrat-Italic",
        textAlign: "center",
    },
    modal: {
        flex: 1
    }
})
