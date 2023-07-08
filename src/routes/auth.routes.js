import React from "react";
import SingIn from "../pages/SingIn";

import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();

const AuthRoutes = () => {
    return(
        <AuthStack.Navigator
        screenOptions={{
            headerShown: false,
        }}>
            <AuthStack.Screen name="SingIn" component={SingIn} />
        </AuthStack.Navigator>
    );
}

export default AuthRoutes;