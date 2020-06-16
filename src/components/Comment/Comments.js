import React from 'react'
import {View} from 'react-native';
import Comment from './Comment';

export default props => {
    return (
        <View>
            <Comment reply={0} owner={true} qtdRating={5} />
        </View>
    )
}
