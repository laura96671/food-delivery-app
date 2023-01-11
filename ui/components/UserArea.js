import React from "react";
import { Text } from "react-native";

export const UserArea = ({ route }) => {

    const username = route.params.username;

    return (
        <Text>{username}</Text>
    )
}