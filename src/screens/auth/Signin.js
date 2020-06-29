import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import auth from '@react-native-firebase/auth';

import Screen from '../Screen'

export default Signin = () => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = () => {
        auth()
            .createUserWithEmailAndPassword(user, password)
            .then(() => {
                console.log('User account created and signed in!')
            })
            .catch(error => {
                message = 'Erro inesperado ao realizar o login. Tente novamente mais tarde.'

                switch (error.code) {
                    case 'auth/user-not-found':
                        message = 'Usuário não encontrado. Registre-se.'
                    break

                    case 'auth/email-already-in-use':
                        message = 'Email já cadastrado.'
                    break

                    case 'auth/invalid-email':
                        message = 'Email inválido.'
                    break

                    default:
                    break
                }

                return Alert.alert(message)
            })
    }

    return (
        <Screen>
            <View style={styles.container}>
                <View style={styles.rowInput}>
                    <Text style={styles.text}> Usuário </Text>
                    <TextInput
                        value={user}
                        onChangeText={setUser}
                        style={styles.input}
                        textAlign="center"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.rowInput}>
                    <Text style={styles.text}> Senha </Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        textAlign="center"
                        autoCapitalize="none"
                        secureTextEntry={true}
                    />
                </View>

                <View style={styles.rowInput}>
                    <TouchableOpacity style={styles.submit} onPress={onSubmit}>
                        <Text style={styles.submitText}> Registar-me </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
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