import React from 'react'
import { SearchBar } from 'react-native-elements';
import  { View } from 'react-native'
export default class App extends React.Component {
    state = {
        search: '',
    };

    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;

        return (
            <View style={{flex: 1}}>
                <SearchBar
                    // onChangeText={someMethod}
                    // onClearText={someMethod}
                    icon={{ type: 'font-awesome', name: 'search' }}
                    placeholder={this.props.title}
                    containerStyle={{backgroundColor: 'rgba(36,41,46,0.76)'}}/>
            </View>

        );
    }
}

