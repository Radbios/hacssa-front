import React from "react";
import Dashboard from "../pages/Dashboard";

import { createStackNavigator } from "@react-navigation/stack";

import TabNavigator from "../layouts/tabbar";


const AppStack = createStackNavigator();

const AppRoutes = () => {
    return(
        <TabNavigator/>
    );
}

export default AppRoutes;