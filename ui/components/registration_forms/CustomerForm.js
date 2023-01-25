import React, { useState } from "react";
import { SafeAreaView, View, Text, Image, TextInput, Pressable, StyleSheet } from "react-native";

export const CustomerForm = ({route, navigation}) => {

    const username = route.params.username;

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");

    const [error, setError] = useState("");

    const pressHandle = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/customerRegistrationInfo', {
            method: 'POST',
            mode: "cors",
            body: JSON.stringify({
              username: username,
              name: name,
              surname: surname,
              phone: phone
            }),
            headers: {
            'Content-Type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then(response => {
            navigation.navigate("Search");
        });
    }

    return (
        <SafeAreaView style={ styles.form }>
            <Image
                source={require('../../utility/images/signup_background.png')}
                style={{width: "100%", height: 400, marginTop: -255, marginBottom: -120}}
            />
            <Text style={styles.title}>Customer Registration Form</Text>
            <Text style={{ color: "red"  }}>{error}</Text>
            <TextInput
                style={[styles.name, styles.input]}
                value={name}
                onChangeText={setName}
                autoCapitalize='none'
                placeholder={"First Name"}
            />
            <TextInput
                style={[styles.surname, styles.input]}
                value={surname}
                onChangeText={setSurname}
                placeholder={"Last Name"}
                autoCapitalize='none'
            />
            <TextInput
                style={[styles.phone, styles.input]}
                value={phone}
                onChangeText={setPhone}
                placeholder={"Phone Number"}
                autoCapitalize='none'
            />
            <Pressable
                style={ styles.signUpButton }
                onPress={pressHandle}
            >
                <Text style={ styles.signUpText }>Sign Up</Text>
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
    title: {
        marginBottom: 10,
        fontWeight: "bold",
        fontSize: 18
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
    name: {
        margin: 12,
        borderWidth: 0.3,
        borderRadius: 5,
        padding: 10,
        marginBottom: 0
    },
    surname: {
        margin: 12,
        borderWidth: 0.3,
        borderRadius: 5,
        padding: 10,
        marginBottom: 0,
    },
    phone: {
        margin: 12,
        borderWidth: 0.3,
        borderRadius: 5,
        padding: 10,
        marginBottom: 0
    },
    signUpButton: {
        backgroundColor: "#F86F07",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        margin: 12,
        borderRadius: 5
    },
    signUpText : {
        color: "white",
        fontWeight: "bold",
    },
});