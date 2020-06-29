import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, SectionList, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';

import Screen from '../Screen'

import { formatDate, numberToCurrency, sumObject, arrayUnique } from '../../utils'

export default Cows = () => {
    const [cows, setCows] = useState([])
    const [cowsAge, setCowsAge] = useState([])

    useFocusEffect(() => {
        const subscriber = firestore()
            .collection('cows')
            .onSnapshot(querySnapshot => {
                const cowsData = []
    
                querySnapshot.forEach(documentSnapshot => {
                    let data = documentSnapshot.data()
    
                    cowsData.push({ ...data, id: documentSnapshot.id })
                })
    
                const cowsAgeData = arrayUnique(cowsData, 'age')
    
                setCows(cowsData)
                setCowsAge(cowsAgeData)
            })

        return () => subscriber()
    }, [])

    return (
        <Screen name="Cows">
            <View style={styles.container}>
                <View style={styles.rowTotal}>
                    <Text style={styles.totals}> { cows.length } Cabeça(s) </Text>
                    <Text> | </Text>
                    <Text style={styles.totals}> { numberToCurrency(sumObject(cows, 'price')) } </Text>
                </View>

                <SectionList
                    sections={
                        cowsAge.map(el => ({ title: el, data: cows.filter(cow => cow.age === el) }))
                    }
                    renderItem={({ item }) => (
                        <TouchableOpacity key={item.id}>
                            <View style={styles.rowItem}>
                                <View style={styles.item}>
                                    <Text style={styles.itemDate}> { formatDate(item.created_at) } </Text>
                                    <Text style={styles.itemPrice}> { numberToCurrency(item.price) } </Text>
                                </View>
                                <Text style={styles.itemArrow}> > </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    renderSectionHeader={({ section }) => (
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionAge}>{ section.title } Meses</Text>
                            <Text style={styles.sectionText}> | </Text>
                            <Text style={styles.sectionText}>{ section.data.length } Cabeça(s)</Text>
                            <Text style={styles.sectionText}> | </Text>
                            <Text style={styles.sectionText}>{ numberToCurrency(sumObject(section.data, 'price')) }</Text>
                        </View>
                    )}
                    keyExtractor={({ id }) => id}
                />
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 89,
    },

    rowTotal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },

    totals: {
        padding: 10,
        fontSize: 16,
    },

    sectionHeader: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#EDEDED',
        flexDirection: 'row',
    },

    sectionAge: {
        fontWeight: 'bold'
    },

    sectionText: {
        marginLeft: 5
    },

    rowItem: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        borderBottomWidth: 1,
        borderColor: '#EDEDED',
        backgroundColor: '#FFF',
        justifyContent: 'space-between'
    },

    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    itemDate: {
        fontSize: 13,
    },

    itemPrice: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10
    },

    itemArrow: {
        alignSelf: 'stretch'
    }
})