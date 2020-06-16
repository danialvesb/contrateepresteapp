import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import commonStyles from '../../commonStyles';

import Textarea from 'react-native-textarea';
export default props => {
    const components = renderCheckbox(props.qtdRating)

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'rgb(0,0,0)', fontSize: 15, fontFamily: commonStyles.fontFamily, fontWeight:'bold'}}>{props.data.customer_name}</Text>
                {
                    components.map((item, index) => (
                      <CheckBox containerStyle={{padding: 1, margin: 1}} key={item.id} checked={true} uncheckedIcon='star-o' checkedIcon='star' checkedColor={'rgb(240, 208, 13)'} size={12}/>
                    ))
                }
            </View>
            <Text style={{fontFamily: commonStyles.fontFamily}}>{props.data.comment}</Text>

            <View>
                {props.reply == 0 && props.owner ?
                    <View>
                        <Textarea
                            maxLength={30}
                            onChangeText={ value => props.setStateReply(value)}
                        />
                        <TouchableOpacity style={{backgroundColor: 'green', width: '50%', margin: 5, padding: 4, borderRadius: 3}} onPress={() => props.sendReply(props.data.evaluations_id)}>
                            <Text style={{fontFamily: commonStyles.fontFamily, color: 'white'}}>Enviar resposta</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.responseStyle}>
                        <Text style={{color: 'white'}}>{props.data.reply}</Text>
                    </View>
                }
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'rgba(36,100,173,0.26)',
        borderRadius: 5,
        padding: 3,
        marginTop: 5
    },
    responseStyle: {
        minHeight: 50,
        backgroundColor: 'rgba(25,67,125,0.26)',
    }
})

function renderCheckbox(qtd) {
    let components = []
    for (let value = 1 ; value <= qtd ; value++) {
        components.push({id: value})
    }
    return components
}
