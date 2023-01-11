import React from 'react';

import {Modal, Text, View, ScrollView, Image, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';

import { ProductDetail } from './ProductDetail';

export const SingleRestaurant = ({route}) => {

    const [showInfo, setShowInfo] = useState(false);
    const [showMenu, setShowMenu] = useState(true);

    const [isModalVisible, setModalVisible] = useState(false);
    const [details, setDetails] = useState({});

    const restaurantName = route.params.restaurantName;
    const restaurantImage = route.params.restaurantImage;
    const restaurantGenre = route.params.restaurantGenre;
    const restaurantAddress = route.params.restaurantAddress;
    const restaurantDescription = route.params.restaurantDescription;
    const restaurantMenu = route.params.restaurantMenu;

    const parsedMenu = JSON.parse(restaurantMenu);
    const categories = parsedMenu.menu.category

    return (
        <ScrollView>
            <View style={styles.background} >
                <ImageBackground
                    source={{uri:restaurantImage}}
                    style={styles.coverImage}>

                </ImageBackground>
            </View>
            <View style={{position: "absolute", alignItems: 'center', width: "100%"}}>
            <Image
                source={require('../utility/images/foodle_logo_white.png')}
                style={styles.logo}
            />
            </View>
            <Text style={styles.title} >{restaurantName}</Text>
            <Text style={styles.genre} >{restaurantGenre}</Text>
            <View style={{ flexDirection:'row', justifyContent: "center", marginTop: 5}}>
                <Icon style={{marginRight: 5}} name="star" size={16} color="red" />
                <Text>Rated 4.9</Text>
            </View>
            <Text style={styles.address} >{restaurantAddress}</Text>
            <View style={styles.menu}>
                <TouchableOpacity onPress={() => { setShowInfo(false); setShowMenu(true); }}>
                    <Text style={{fontSize: 18, fontWeight: "200", marginRight: 80}} >Menu</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setShowInfo(true); setShowMenu(false); }}>
                    <Text style={{fontSize: 18, fontWeight: "200"}} >Information</Text>
                </TouchableOpacity>
            </View>
            {
                showInfo ?
                    <View style={{ width: "100%", backgroundColor: "white", borderRadius: 10 }}>
                        <View style={{ margin: 20 }}>
                            <Text style={styles.headers}>Where to find us</Text>
                            <Text style={{ fontSize: 16 }}>•• {restaurantAddress} ••</Text>

                            <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 10 }}>About us</Text>
                            <Text style={{ fontSize: 16 }}>{restaurantDescription}</Text>
                        </View>
                    </View>
                :
                    <View>
                        {categories.map(category => {
                            const mainCategories = Object.keys(category);
                            return (
                                <View style={{ margin: 20 }}>
                                    <Text style={{ fontSize: 23, fontWeight: "bold", marginBottom: 15 }}>{mainCategories}</Text>
                                    {(Object.values(category)).map(product =>
                                       product.map(elem =>
                                            <View style={{ width: "100%", backgroundColor: "white", borderRadius: 5, marginBottom: 3 }}>
                                                <View style={{ margin: 10, marginBottom: 15, marginTop: 15, marginLeft: 15, flexDirection: "row" }}>
                                                    <View style={{ flex: 50 }}>
                                                        <TouchableOpacity onPress={() => {
                                                            setModalVisible(true)
                                                            setDetails({
                                                                "product": elem["name"],
                                                                "price": elem["price"],
                                                                "description": elem["description"],
                                                                "ingredients": elem["ingredients"],
                                                                "picture": elem["picture"]
                                                            })
                                                        }}
                                                        >
                                                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{elem["name"]}</Text>
                                                        </TouchableOpacity>
                                                        <Text style={{ fontSize: 15, color: "grey", marginTop: 3 }}>{elem["description"]}</Text>
                                                        <Text style={{ fontSize: 16, color: "black", marginTop: 10 }}>${elem["price"]}</Text>
                                                    </View>
                                                    {
                                                        elem["picture"] ?
                                                        <Image
                                                            source={{uri:elem["picture"]}}
                                                            style={{ width: "30%", height: 110, borderRadius: 5 }}
                                                        /> :
                                                        <Text></Text>
                                                    }
                                                </View>
                                            </View>
                                       )
                                    )}
                                </View>
                            )
                        })}
                        <View>
                            <Modal
                                animationType="slide"
                                transparent={false}
                                visible={isModalVisible}
                            >
                                <View style={styles.modalView}>
                                    <ProductDetail
                                        setModalVisible={setModalVisible}
                                        details={details}
                                        restaurantImage={restaurantImage}
                                    />
                                </View>
                            </Modal>
                        </View>
                    </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    coverImage: {
        width: "100%",
        height: 180,
        opacity: .6
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20
    },
    genre: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 15
    },
    address: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16
    },
    logo: {
        width: 60,
        height: 60,
        marginTop:10,
    },
    background: {
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    menu: {
        flexDirection:'row',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        marginTop: 20,
        margin: 15,
        height: 40,
        borderRadius: 50,
    },
    headers: { fontWeight: "bold", fontSize: 17 },
});