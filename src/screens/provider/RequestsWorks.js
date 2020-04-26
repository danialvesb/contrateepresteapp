import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import RequestWork from './RequestWork';


export default class RequestsWorks extends Component{
    render(): React.ReactNode {
        return (
            <ScrollView style={styles.container}>
                <RequestWork></RequestWork>
                <RequestWork></RequestWork>
                <RequestWork></RequestWork>
                <RequestWork></RequestWork>
                <RequestWork></RequestWork>
                <RequestWork></RequestWork>
                <RequestWork></RequestWork>
                <RequestWork></RequestWork>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
