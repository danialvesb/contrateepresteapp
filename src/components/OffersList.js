import React from 'react'
import { View, StyleSheet, ScrollView, RefreshControl} from 'react-native'
import 'moment/locale/pt-br'
import Spinner from 'react-native-loading-spinner-overlay'
import Offer from './Offer'

export default props => {
    let { offersData, spinner, refreshing, refreshingState } = props

    return (
        <View style={styles.container}>
            <Spinner
                visible={spinner}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.scrollview}>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshingState} onRefresh={() => refreshing() } />
                    }>
                    {offersData &&
                        offersData.map((item, index) => (
                            <Offer key={item.id}
                                name={item.name}
                                navigation={props.navigation}
                                locale={`${item.city} / ${item.uf}`}
                                district={item.district}
                                rating={item.rating}
                                typeOffer={item.service_title}
                                data={item}/>
                        ))
                    }
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    container: {
        flex: 1
    },
    scrollview: {
        flex: 5
    },
    taskList: {
        flex: 5
    },
})
