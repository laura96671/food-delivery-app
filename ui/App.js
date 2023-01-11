import * as React from 'react';
import { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { SearchBar } from './components/SearchBar';
import { SignUpForm } from './components/SignUpForm';
import { UserArea } from './components/UserArea';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Restaurants } from './components/Restaurants';
import { SingleRestaurant } from './components/SingleRestaurant';

export default function App() {

    const Stack = createNativeStackNavigator();

    const [restaurants, setRestaurants] = useState([""]);
    const [restId, setRestId] = useState([""]);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Search">
                    {({navigation}) =>
                        <SearchBar
                            navigation={navigation}
                            setRestaurants={setRestaurants}
                            restaurants={restaurants}
                        />
                    }
                </Stack.Screen>
                <Stack.Screen name="Restaurants" options={{ title: 'Restaurants' }}>
                    {({navigation}) =>
                        <Restaurants
                            restId={restId}
                            navigation={navigation}
                            restaurants={restaurants}
                        />
                    }
                </Stack.Screen>
                <Stack.Screen name="Restaurant Detail" options={{ title: "Your Choice" }} component={SingleRestaurant} />
                <Stack.Screen name="Registration Form" options={{ title: "Registration Form" }}>
                    {({navigation}) =>
                        <SignUpForm
                            navigation={navigation}
                        />
                    }
                </Stack.Screen>
                <Stack.Screen name="Personal Area" options={{ title: "Personal Area" }} component={UserArea} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
