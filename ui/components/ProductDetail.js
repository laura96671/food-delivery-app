import React from "react";

import { Button, Text, View, Image,TouchableOpacity, ImageBackground, StyleSheet, ScrollView } from "react-native";

export const ProductDetail = ({ details, setModalVisible, restaurantImage }) => {

    return(
        <ScrollView>
            {details.picture ?
            <ImageBackground
                source={{uri:details.picture}}
                style={{ width: "100%", height: 300, width: 500 ,borderRadius: 5, opacity: .7}}
            />:
            <ImageBackground
                source={{uri:restaurantImage}}
                style={{ width: "100%", height: 200, opacity: .6 }}>
            </ImageBackground>
            }
            <View style={{position: "absolute", alignItems: 'flex-end', right: 30, top: 30}}>
                <TouchableOpacity onPress={() => setModalVisible(false) }>
                    <Text style={{ fontSize: 30, marginTop: 20,  }}>X</Text>
                </TouchableOpacity>
            </View>
            <View style={{ borderTopWidth: 0.3, borderBottomWidth: 0.3, borderRadius: 15, marginTop: 20 }}>
                <View style={{ margin: 20 }}>
                    <Text style={{ fontSize: 23, fontWeight: "bold", marginBottom: 15, }}>{details.product}</Text>

                    <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 5 }}>Description</Text>
                    <Text style={{ fontSize: 15, marginBottom: 15 }}>{details.description}</Text>

                    <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 5 }}>Ingredients</Text>
                    {details.ingredients ?
                    (details.ingredients.split(",")).map((ingredient, key) =>
                        <Text key={key} style={{ fontSize: 15 }}>{`\u2022 ${ingredient}`}</Text>) :
                    <Text></Text>
                    }
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

});