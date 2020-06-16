import React from 'react'
import {View} from 'react-native';
import Comment from './Comment';

export default props => {

    return (
        <View style={{flex: 1}}>
            {props.interations.map((item, index) => (
                <Comment data={item} key={item.evaluations_id} reply={item.reply} owner={isOwnwe(props.userAuth, item.offer_owner)} qtdRating={item.rating} />
                )
            )

            }
        </View>
    )
}

function isOwnwe(user, offerOwner) {
    if (user) {
        if (user.id === offerOwner) {
            return true
        }else {
            return false
        }
    }else {
        return false
    }
}
