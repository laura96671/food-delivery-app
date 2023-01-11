import React, { useState } from "react";

import { SafeAreaView, Text, TextInput, Pressable, StyleSheet, View, Image } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export const SignUpForm = ({ navigation }) => {

    const types = ["User", "Restaurant"];

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [type, setType] = useState("");

    const [toggleUser, setToggleUser] = useState(false)
    const [toggleRestaurant, setToggleRestaurant] = useState(false)

    const [error, setError] = useState("");

    const pressHandle = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/registrationInfo', {
            method: 'POST',
            mode: "cors",
            body: JSON.stringify({
              username: username,
              email: email,
              password: password,
              type: type
            }),
            headers: {
            'Content-Type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then(response => {
            if(response["message"]) {
                setError(response["message"])
            } else{
                navigation.navigate("Search");
            }
        });
    }

    return (
        <SafeAreaView style={ styles.form }>
            <Image
                source={require('../utility/images/signup_background.png')}
                style={{width: "100%", height: 400, marginTop: -190, marginBottom: -120}}
            />
            <Text style={styles.modalText}>Registration Form</Text>
            <Text style={{ color: "red",  }}>{error}</Text>
            <TextInput
                style={[styles.username, styles.input]}
                value={username}
                onChangeText={setUsername}
                autoCapitalize='none'
                placeholder={"username"}
            />
            <TextInput
                style={[styles.email, styles.input]}
                value={email}
                onChangeText={setEmail}
                placeholder={"email"}
                autoCapitalize='none'
            />
            <TextInput
                style={[styles.password, styles.input]}
                value={password}
                onChangeText={setPassword}
                placeholder={"password"}
                autoCapitalize='none'
            />
            <View style={{ flexDirection: "row" }}>
                <BouncyCheckbox
                  margin={20}
                  size={30}
                  fillColor="green"
                  unfillColor="#FFFFFF"
                  text="User"
                  disableBuiltInState={toggleUser}
                  textStyle={{ textDecorationLine: "none" }}
                  onPress={(isChecked:boolean) => {
                    setToggleRestaurant(true);
                    setToggleUser(false);
                    setType("User");
                }}
                />
                <BouncyCheckbox
                  margin={20}
                  size={30}
                  fillColor="green"
                  unfillColor="#FFFFFF"
                  text="Restaurant"
                  disableBuiltInState={toggleRestaurant}
                  onPress={() => {
                    setToggleRestaurant(false);
                    setToggleUser(true);
                    setType("Restaurant");
                  }}
                />
            </View>
            <Pressable
                style={ styles.loginButton }
                onPress={pressHandle}
            >
                <Text style={ styles.loginText }>Sign up</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    form: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "white"
    },
    username: {
        margin: 12,
        borderWidth: 0.3,
        borderRadius: 5,
        padding: 10,
        marginBottom: 0,
    },
    input : {
        width: 300,
        height: 40,
        shadowOpacity: 0.5,
        shadowOffset: {
          height: 0.4,
          width: 0.3
        },
        backgroundColor: "#f5f5f5"
    },
    email: {
        margin: 12,
        borderWidth: 0.3,
        borderRadius: 5,
        padding: 10,
        marginBottom: 0
    },
    password: {
        margin: 12,
        borderWidth: 0.3,
        borderRadius: 5,
        padding: 10,
        marginBottom: 5
    },
    loginButton: {
        backgroundColor: "#F86F07",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        margin: 12,
        borderRadius: 5
    },
    loginText : {
        color: "white",
        fontWeight: "bold",
    },
    modalText: {
        marginBottom: 10,
        fontWeight: "bold",
        fontSize: 18
    },
});