import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import firestore from '@react-native-firebase/firestore';

import Screen from '../Screen'

import { getDate } from '../../utils'

const ref = firestore().collection('cows')

export default NewCow = ({ navigation }) => {
    const [months, setMonths] = useState(null)
    const [qty, setQty] = useState(null)
    const [price, setPrice] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async () => {
        const date = getDate()

        setIsLoading(true)

        try {
            let loop = qty

            const only_number = price.replace(/[^\d]/g, '') / 100

            while (loop-- > 0) {
                await ref.add({ age: months, price: only_number, created_at: date })
            }

            Alert.alert('Dados salvos com sucesso!')

        } catch (e) {
            Alert.alert('Ocorreu algum erro ao tentar salvar os dados.')
            console.log(e)
        }

        setIsLoading(false)

        navigation.navigate('Cows')
    }

    return (
        <Screen>
            {isLoading && (
                <View style={{ flexDirection: 'row', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}

            {!isLoading && (
                <View style={styles.container}>
                    <View style={styles.rowInput}>
                        <Text style={styles.text}> Idade da Vaca (em meses) </Text>
                        <TextInput
                            value={months}
                            onChangeText={setMonths}
                            style={styles.input}
                            keyboardType="numeric"
                            textAlign="center"
                        />
                    </View>

                    <View style={styles.rowInput}>
                        <Text style={styles.text}> Quantidade </Text>
                        <TextInput
                            value={qty}
                            onChangeText={setQty}
                            style={styles.input}
                            keyboardType="numeric"
                            textAlign="center"
                        />
                    </View>

                    <View style={styles.rowInput}>
                        <Text style={styles.text}> Valor (por vaca) </Text>
                        <TextInputMask
                            type={'money'}
                            options={{
                                precision: 2,
                                separator: ',',
                                delimiter: '.',
                                unit: 'R$',
                                suffixUnit: ''
                            }}
                            value={price}
                            onChangeText={text => {
                                setPrice(text)
                            }}
                            style={styles.input}
                            keyboardType="numeric"
                            textAlign="center"
                        />
                    </View>

                    <View style={styles.rowInput}>
                        <TouchableOpacity style={styles.submit} onPress={onSubmit}>
                            <Text style={styles.submitText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },

    rowInput: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },

    input: {
        height: 40,
        paddingHorizontal: 5,
        borderColor: '#EDEDED',
        borderWidth: 1,
        width: '90%',
        backgroundColor: '#FFF'
    },

    text: {
        marginBottom: 2
    },

    submit: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#3880ff',
        width: '90%',
        alignItems: 'center'
    },

    submitText: {
        color: '#3880ff',
        color: '#FFF'
    }
})