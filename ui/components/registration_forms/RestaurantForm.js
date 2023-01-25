import React, { useState } from "react";
import { SafeAreaView, View, Text, Image, TextInput, Pressable, StyleSheet } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

import Geocode from "react-geocode";
import config from '../../config.js';


export const RestaurantForm = ({ route, navigation }) => {

    const username = route.params.username;
    const [genre, setGenre] = useState("");
    const [data, setData] = useState({restaurantName: "ff",
                                      description: "",
                                      genre: "",
                                      address: "",
                                      latitude: "",
                                      longitude: ""
                                      });

    // Dropdown Menu Items
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        {label: 'Asian', value: 'asian'},
        {label: 'Burgers', value: 'burgers'},
        {label: 'Chinese', value: 'chinese'},
        {label: 'Indian', value: 'indian'},
        {label: 'Italian', value: 'italian'},
        {label: 'Pizza', value: 'pizza'},
        {label: 'Sushi', value: 'sushi'},
    ]);

    const handleChange = (name) => {
        return(text) => {
            setData({...data, [name]: text });
        }
    }

    // Getting lat & long from address
    const address = data.address
    const geocodeApi = config.api.GEOCODE_API;
    const getLatLong = (address) => {
      Geocode.setApiKey(geocodeApi);
      Geocode.setLanguage("en");
      Geocode.setLocationType("ROOFTOP");
      Geocode.enableDebug();

      Geocode.fromAddress(data.address).then(
          (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              setData({...data, latitude: lat, longitude: lng})
          },
          (error) => {
              console.error(error);
          }
      );
    }

    const pressHandle = (e) => {
        e.preventDefault();
        getLatLong(address);

        fetch('http://localhost:8080/restaurantRegistrationInfo', {
            method: 'POST',
            mode: "cors",
            body: JSON.stringify({
                username: username,
                restaurantName: data.restaurantName,
                description: data.description,
                genre: genre,
                address: data.address,
                latitude: data.latitude,
                longitude: data.longitude
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
            <Text style={styles.title}>Restaurant Registration Form</Text>
            <TextInput
                style={[styles.name, styles.input]}
                value={data.restaurantName}
                onChangeText={handleChange("restaurantName")}
                autoCapitalize='none'
                placeholder={"Restaurant Name"}
            />
            <TextInput
                style={[styles.phone, styles.input]}
                value={data.address}
                onChangeText={handleChange("address")}
                placeholder={"Restaurant Address"}
                autoCapitalize='none'
            />
            <DropDownPicker
              searchable={true}
              placeholder="Choose a genre"
              open={open}
              value={genre}
              items={items}
              setOpen={setOpen}
              setValue={setGenre}
              setItems={setItems}
              style={[styles.dropdown, styles.input]}
              containerStyle={{ alignItems: "center" }}
              dropDownContainerStyle={{
                width: "70%",
                backgroundColor: "#f5f5f5",
                borderTopWidth: 0,
                borderWidth: 0.2,
              }}
              placeholderStyle={{
                opacity: 0.3,
              }}
            />
            <TextInput
                style={styles.description}
                value={data.description}
                onChangeText={handleChange("description")}
                placeholder={"Short Description..."}
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
        marginTop: 100,
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
    description: {
        width: 300,
        margin: 12,
        height: 90,
        borderWidth: 0.3,
        borderRadius: 5,
        padding: 10,
        marginBottom: 0,
        shadowOpacity: 0.5,
        shadowOffset: {
          height: 0.4,
          width: 0.3
        },
        backgroundColor: "#f5f5f5"
    },
    phone: {
        margin: 12,
        borderWidth: 0.3,
        borderRadius: 5,
        padding: 10,
        marginBottom: 0
    },
    dropdown: {
        margin: 12,
        borderWidth: 0.3,
        borderRadius: 5,
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