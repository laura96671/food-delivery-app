import React from 'react';

import { Text, View, SafeAreaView, TextInput, StyleSheet, Button, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import { geocodeSettings } from '../utility/geocode.js';
import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { persistor } from "../redux/store";
import { RESET_ACTION } from '../redux/action';
import { store } from '../redux/store';

import { Restaurants } from './Restaurants';
import { LoginForm } from './registration_forms/LoginForm';
import { NotificationContext } from '../App';

export const SearchBar = ({navigation, restaurants, setRestaurants}) => {

    const {user, restaurant} = useSelector(state => state.actionReducer);
    const dispatch = useDispatch();
    console.log(user, "ddddgg",restaurant)

    const [myAddress, setMyAddress] = useState("");
    const [showComponent, setShowComponent] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setRestaurants([""]);

        fetch('http://localhost:8080/addGeohash', {
          method: 'POST',
          mode: "cors",
          body: JSON.stringify({
              lat: 51.514420,
              lng: -0.180530
          }),
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((res) => res.json())
        .then(response => {
            console.log("rrrr", response)
            setRestaurants(response);

            return response;
        });
        navigation.navigate('Restaurants');
        //geocodeSettings(myAddress, setRestaurants);
    }

    const handleChange = (text) => {
        setMyAddress(text);
    }

    return (
        <>
            <View style={{ backgroundColor: "white" }}>
                  <Text>Welcome back</Text>
                  {user ? <Text>Welcome back, {user}</Text> : <></>}
                  <Button title="log in" onPress={toggleModal} />
                  <Button title="log out" onPress={() => store.dispatch(RESET_ACTION)} />
                  <View style={styles.centeredView}>
                      <Modal
                          animationType="slide"
                          transparent={true}
                          visible={isModalVisible}
                          onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!isModalVisible);
                          }}
                        >
                          <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                              <Pressable
                                onPress={() => setModalVisible(!isModalVisible)}
                              >
                                <Text style={styles.textStyle}>X</Text>
                              </Pressable>
                              <LoginForm
                                navigation={navigation}
                                setModalVisible={setModalVisible}
                            />
                            </View>
                          </View>
                        </Modal>
                    </View>
            </View>
            <SafeAreaView style={styles.bgColor}>
                <Image
                    source={require('../utility/images/foodle_logo.png')}
                    style={{width: 130, height: 130, marginBottom: 150, marginTop: 300}}
                />
                <View style={{ flexDirection: "row", alignItems:'center',justifyContent:'center'}}>
                    <TextInput
                        id="address"
                        name="address"
                        value={myAddress}
                        style={styles.text}
                        placeholder="221B Baker Street, London"
                        onChangeText={handleChange}
                        keyboardType = 'web-search'
                    />
                    <TouchableOpacity
                        title="GO!"
                        onPress={handleSubmit}
                        style={styles.button}
                    >
                        <Text style={styles.loginText}>GO!</Text>
                    </TouchableOpacity>
                </View>
                <Image
                    source={require('../utility/images/background.png')}
                    style={{width: 450, height: 440, marginBottom:220}}
                />
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    text: {
        backgroundColor: "white",
        width: 320,
        borderRadius: 30,
        height: 50,
        margin: 12,
        borderWidth: 0.2,
        padding: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    bgColor: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        marginTop: 100,
        width: "80%",
        height: 300,
        margin: 50,
        backgroundColor: "white",
        borderRadius: 30,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        marginRight:10,
        marginLeft:-65,
        paddingTop:12,
        paddingBottom:12,
        backgroundColor:'orange',
        borderRadius:50,
        borderColor: 'orange'
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    loginText:{
        fontSize: 16,
        color:'#fff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    },
    textStyle: {
        color: "black",
        top: -10,
        right: -130,
        height: 20,
    },
})