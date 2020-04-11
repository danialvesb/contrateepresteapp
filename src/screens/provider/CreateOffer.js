import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {server, showError} from '../../common';
import Work from '../../components/Work';
import {Avatar, Caption, Title} from 'react-native-paper';
import Search from '../../components/header/Search';
import Icon from 'react-native-vector-icons/FontAwesome';

const initialState = {
    services: [],
    spinner: false,
    data: {
        service: null,
        description: null,
        user: null,
        amount: null,
    },
};

export default class CreateOffer extends Component {
    // componentDidMount = async () => {
    //
    //     setTimeout(() => {
    //         let resp = this.getData()
    //         if (resp)
    //             this.setState({
    //                 spinner: !this.state.spinner,
    //             });
    //     }, 5000);
    //
    // }

    state = {
        ...initialState,
    };

    getData = async () => {
        try {
            const resp = await axios.get(`${server}/services/`);
            this.setState({services: resp.data});
        } catch (err) {
            showError(err);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrool}>
                    <View style={styles.services}>
                        <View>
                            <Search title='Pesquise tipo de serviço'></Search>
                            <Text style={styles.servicesHeaderText}>Selecione o tipo de serviço</Text>
                        </View>
                        <ScrollView horizontal={true} style={styles.scroolServices}>
                            {/*{*/}
                            {/*    this.state.services.map((item, index) => (*/}
                            {/*        <View style={styles.service} key={item.id}>*/}
                            {/*            <Text>{item.title}</Text>*/}
                            {/*        </View>*/}
                            {/*    ))*/}
                            {/*}*/}
                            <TouchableOpacity style={styles.service}>
                                <View>
                                    <Avatar.Image
                                        source={{uri: 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg'}}
                                        size={80}/>
                                    <Text>Pintura de casas</Text>
                                    <Caption style={styles.caption}>Prestador</Caption>
                                </View>
                                <View>
                                    <Text>Categoria pintura</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.service}>
                                <View>
                                    <Avatar.Image
                                        source={{uri: 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg'}}
                                        size={80}/>
                                    <Text>Pintura de casas</Text>
                                    <Caption style={styles.caption}>Prestador</Caption>
                                </View>
                                <View>
                                    <Text>Categoria pintura</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.service}>
                                <View>
                                    <Avatar.Image
                                        source={{uri: 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg'}}
                                        size={80}/>
                                    <Text>Pintura de casas</Text>
                                    <Caption style={styles.caption}>Prestador</Caption>
                                </View>
                                <View>
                                    <Text>Categoria pintura</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.service}>
                                <View>
                                    <Avatar.Image
                                        source={{uri: 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg'}}
                                        size={80}/>
                                    <Text>Pintura de casas</Text>
                                    <Caption style={styles.caption}>Prestador</Caption>
                                </View>
                                <View>
                                    <Text>Categoria pintura</Text>
                                </View>
                            </TouchableOpacity>


                        </ScrollView>
                    </View>
                    <View style={styles.photosList}>
                        <View>
                            <Text style={styles.servicesHeaderText}>Inserir Imagens</Text>
                        </View>
                        <View>
                            <ScrollView horizontal={true} style={styles.scroolServices}>
                                <View style={styles.photo}>
                                    <TouchableOpacity onPress={() => console.log('press')} style={styles.photo}>
                                        <Icon name="camera" size={80} color='#FFF'/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.photo}>
                                    <TouchableOpacity onPress={() => console.log('press')} style={styles.photo}>
                                        <Icon name="camera" size={80} color='#FFF'/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.photo}>
                                    <TouchableOpacity onPress={() => console.log('press')} style={styles.photo}>
                                        <Icon name="camera" size={80} color='#FFF'/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.photo}>
                                    <TouchableOpacity onPress={() => console.log('press')} style={styles.photo}>
                                        <Icon name="camera" size={80} color='#FFF'/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.photo}>
                                    <TouchableOpacity onPress={() => console.log('press')} style={styles.photo}>
                                        <Icon name="camera" size={80} color='#FFF'/>
                                    </TouchableOpacity>
                                </View>

                            </ScrollView>
                        </View>

                    </View>
                    <View style={styles.amount}>

                    </View>
                    <View style={styles.description}>

                    </View>

                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    services: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    scrool: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#c9cbd3',
    },
    scroolServices: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#626262',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    service: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: 'blue',
        width: 250,
        height: 150,
    },
    photosList: {
        flex: 1,
        backgroundColor: '#24292e',
        width: '100%',
        height: '100%',

    },
    photo: {
        flex: 1,
        margin: 5,
        padding: 5,
        backgroundColor: '#c9cbd3'
    },

    amount: {
        flex: 1,
    },
    description: {
        flex: 1,
    },
    servicesHeaderText: {
        fontSize: 15,
        color: '#FFF',
    },

});
