import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Header = ({ name }) => {
    return (
        <View style={ styles.container }>
            <View style={ styles.rowContainer }>
                <Text style={styles.title}>{ name }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#BBB'
    },

    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    title: {
        color: '#333',
        fontWeight: 'bold'
    }
})

export default Header