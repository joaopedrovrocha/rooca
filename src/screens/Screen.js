import React from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'

import Header from '../components/Header'

const Screen = ({ children }) => {
    return (
        <View>
            {/* <Header name={ name } /> */}

            <View style={ styles.container }>
                { children }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { paddingBottom: 29 }
})

export default Screen