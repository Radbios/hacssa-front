import React, {useContext} from "react";
import { View, TouchableOpacity, Text } from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
  } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AuthContext from "../../contexts/auth";

function CustomDrawer(props){

    const { singOut } = useContext(AuthContext);

    async function handleSignOut(){
        await singOut();
    }

    return(
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                labelStyle={{ color: 'white' }}
                label="Logout"
                onPress={handleSignOut}
                icon={
                    () => <MaterialCommunityIcons name="logout" size={24} color="white"/>
                }
            />
        </DrawerContentScrollView>
    );
}

export default CustomDrawer;