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
            <View>
                <SearchBar inputStyle={{padding: 0 }}
                    placeholder="Estou a procura de..."
                    onChangeText={this.updateSearch}
                    value={search}


                />
            </View>

        );
    }
}

