import React from 'react';

import { useState, useEffect } from 'react';
import {Text, SafeAreaView, View, ScrollView, Image, StyleSheet, TouchableOpacity} from 'react-native';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Restaurants = ({navigation, restaurants, small_id}) => {

    const [restaurantsId, setRestaurantsId] = useState([""]);

    return(
        <ScrollView>
            <SafeAreaView style={{ marginLeft: 20, marginRight: 20, justifyContent:'center' }}>
                <Text
                    style={{ fontSize: 20, fontWeight: "bold", marginTop: 30, marginBottom: 30}}
                >
                        {restaurants.length > 1 ? `Found ${restaurants.length} Restaurants` : "Found 1 Restaurant"}
                </Text>
                <View>
                    {restaurants.map((restaurant, key) => {
                        return(
                            <View style={styles.container}>
                                <TouchableOpacity onPress={() => navigation.navigate("Restaurant Detail", {
                                                                             restaurantName: restaurant.restaurant_name,
                                                                             restaurantImage: restaurant.cover_image,
                                                                             restaurantGenre: restaurant.genre,
                                                                             restaurantAddress: restaurant.address,
                                                                             restaurantDescription: restaurant.description,
                                                                             restaurantMenu: restaurant.menu,
                                                                             })}>
                                    <Image
                                        source={{uri:restaurant.cover_image}}
                                        style={styles.coverImage}
                                    />
                                </TouchableOpacity>
                                <View style={styles.underText}>
                                    <Text style={styles.restaurantName}>{restaurant.restaurant_name}</Text>
                                    <View style={{ flexDirection:'row', flexWrap:'wrap', alignItems:'center' }}>
                                        <Icon name="star" size={16} color="red" />
                                        <Text style={styles.genre}>4.9 (9) - {restaurant.genre}</Text>
                                    </View>
                                    <View style={{ flexDirection:'row', flexWrap:'wrap', alignItems:'center' }}>
                                        <Icon name="clock-o" size={16} color="black" />
                                        <Text style={styles.time}>15-40 min</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        borderWidth: 0.8,
        borderRadius: 10,
        marginBottom: 20,
        borderColor: "grey"
    },
    coverImage: {
        width: "100%",
        height: 150,
        marginRight: 30,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    restaurantName: {
        fontWeight: "bold"
    },
    underText: {
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    genre: {
        marginTop: 10,
        color: "black",
        fontSize: 13,
        marginLeft: 10
    },
    time: {
        marginTop: 10,
        color: "black",
        fontSize: 13,
        marginLeft: 10,
        color: "grey"
    }
})