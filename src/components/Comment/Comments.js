import React from 'react'
import {View} from 'react-native';
import Comment from './Comment';

export default props => {
    return (
        <View style={{flex: 1}}>
            <Comment reply={0} owner={true} qtdRating={5} />
            <Comment reply={0} owner={false} qtdRating={5} />
            <Comment reply={0} owner={true} qtdRating={5} />
            <Comment reply={0} owner={true} qtdRating={5} />
        </View>
    )
}
