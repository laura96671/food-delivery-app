import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, TextInput, Pressable, Text, FlatList } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { getUsername, getRestaurant } from '../../redux/action';

import { UserArea } from '../UserArea';

export const LoginForm = ({ navigation, setModalVisible }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { user, restaurant, logOut } = useSelector(state => state.actionReducer);
    const dispatch = useDispatch();

    const [error, setError] = useState("");

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/getLoginInfo', {
            method: 'POST',
            mode: "cors",
            body: JSON.stringify({
               username: username,
               password: password
            }),
            headers: {
            'Content-Type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then(response => {
            if(response["password"] == password) {
                dispatch(getUsername(response));
                navigation.navigate("Personal Area");
                setModalVisible(false);
                if(response.type == "Restaurant") {
                    fetch('http://localhost:8080/getUserRestaurant', {
                        method: 'POST',
                        mode: "cors",
                        body: JSON.stringify({
                           username: username,
                        }),
                        headers: {
                        'Content-Type': 'application/json',
                        }
                    })
                    .then((res) => res.json())
                    .then(response => {
                        if(response) {
                           dispatch(getRestaurant(response));
                        }
                    });
                }
            } else { setError("wrong email or password") }
        });
    }

   return (
    <SafeAreaView style={ styles.form }>
        <Text style={styles.modalText}>LOGIN FORM</Text>
        <TextInput
            style={styles.username}
            value={username}
            onChangeText={setUsername}
            autoCapitalize='none'
        />
        <TextInput
            style={styles.password}
            value={password}
            onChangeText={setPassword}
            autoCapitalize='none'
        />
        <Text style={{ marginLeft: 12, color: "red" }}>{error}</Text>
        <Pressable
            style={ styles.loginButton }
            onPress={handleLoginSubmit}
        >
            <Text style={ styles.loginText }>Log in</Text>
        </Pressable>
        <Pressable
            style={{ margin: 12, marginTop: 5, alignItems: "center" }}
            onPress={() => { navigation.navigate('Registration Form'); setModalVisible(false) }}
        >
            <Text style={{ color: "grey" }}> Don't have an account? Sign up </Text>
        </Pressable>
    </SafeAreaView>
   );
}

const styles = StyleSheet.create({
  form: {
    justifyContent: "center",
  },
  username: {
    width: 250,
    height: 35,
    margin: 12,
    borderWidth: 0.3,
    borderRadius: 5,
    padding: 10,
    marginBottom: 0
  },
  password: {
    width: 250,
    height: 35,
    margin: 12,
    borderWidth: 0.3,
    borderRadius: 5,
    padding: 10,
    marginBottom: 5
  },
  loginButton: {
    backgroundColor: "orange",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    margin: 12,
    borderRadius: 5
  },
  loginText : {
    color: "white",
    fontWeight: "bold"
  },
  modalText: {
      marginBottom: 10,
      textAlign: "center"
  },
});