import React from 'react'
import { SearchBar } from 'react-native-elements';
import  { View } from 'react-native'
export default props => {

    return (
        <View style={{flex: 1}}>
            <SearchBar
                onChangeText={ value => props.filterListPerText(value)}
                value={props.textSearchValue     }
                // onClearText={someMethod}
                icon={{ type: 'font-awesome', name: 'search' }}
                placeholder={props.title}
                containerStyle={{backgroundColor: 'rgba(36,41,46,0.76)'}}/>
        </View>

    )
}

