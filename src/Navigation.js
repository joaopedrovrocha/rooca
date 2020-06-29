import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth'

import {
    Login,

    Home,

    Cows,
    NewCow,

    Chickens
} from './screens'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{
                title: 'Início',
                headerRight: () => (
                    <TouchableOpacity onPress={() => auth().signOut()} style={{ paddingRight: 20 }}>
                        <Ionicons name={"ios-home"} size={22} />
                    </TouchableOpacity>
                )
            }} />
        </Stack.Navigator>
    )
}

const CowStack = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName="Cows">
            <Stack.Screen
                name="Cows"
                component={Cows}
                options={{
                    title: 'Vacas',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('NewCow')} style={{ paddingRight: 20 }}>
                            <Ionicons name={"ios-home"} size={22} />
                        </TouchableOpacity>
                    )
                }}
            />
            <Stack.Screen name="NewCow" component={NewCow} options={{ title: 'Adicionar Vaca(s)' }} />
        </Stack.Navigator>
    )
}

const ChickensStack = () => {
    return (
        <Stack.Navigator initialRouteName="Chickens">
            <Stack.Screen name="Chickens" component={Chickens} options={{ title: 'Galinhas' }} />
        </Stack.Navigator>
    )
}

const TabNavigation = (
    <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{ tabBarLabel: 'Início' }}
        />
        <Tab.Screen
            name="Cows"
            component={CowStack}
            options={{ tabBarLabel: 'Vacas' }}
        />
        <Tab.Screen
            name="Chickens"
            component={ChickensStack}
            options={{ tabBarLabel: 'Galinhas' }}
        />
    </Tab.Navigator>
)

const AuthStack = (
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ title: 'Entrar' }} />
        <Stack.Screen name="Signin" component={Signin} options={{ title: 'Registar-se' }} />
    </Stack.Navigator>
)

const Navigator = () => {
    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState()

    function onAuthStateChanged(user) {
        setUser(user)
        if (initializing) setInitializing(false)
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)

        return subscriber
    }, [])

    if (initializing) return <Text>Loading...</Text>

    return (
        <NavigationContainer>
            {user ? (TabNavigation) : (AuthStack)}
        </NavigationContainer>
    )
}

export default Navigator