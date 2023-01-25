import React from "react";
import { Text } from "react-native";

import { useSelector, useDispatch } from 'react-redux';

export const UserArea = () => {

    const { user, restaurant } = useSelector(state => state.actionReducer);
    const dispatch = useDispatch();

    console.log("dd", user)

    return (
        <>
            <Text>jjj</Text>
            <Text>kkk</Text>
        </>
    )
}