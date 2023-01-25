import * as React from 'react';
import { useState, useEffect } from 'react';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

import { SearchBar } from './components/SearchBar';
import { SignUpForm } from './components/registration_forms/SignUpForm';
import { UserArea } from './components/UserArea';
import { CustomerForm } from './components/registration_forms/CustomerForm';
import { RestaurantForm } from './components/registration_forms/RestaurantForm';
import { Restaurants } from './components/Restaurants';
import { SingleRestaurant } from './components/SingleRestaurant';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

    const Stack = createNativeStackNavigator();

    const [restaurants, setRestaurants] = useState([""]);
    const [restId, setRestId] = useState([""]);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
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
                        <Stack.Screen name="Customer Form" options={{ title: "Customer Form" }} component={CustomerForm} />
                        <Stack.Screen name="Restaurant Form" options={{ title: "Restaurant Form" }} component={RestaurantForm} />
                        <Stack.Screen name="Personal Area" options={{ title: "Personal Area" }} component={UserArea} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
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
