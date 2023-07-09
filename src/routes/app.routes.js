import React from "react";
import Dashboard from "../pages/Dashboard";

import { View } from "react-native";
import DrawerNavigator from "./app/drawer.routes";
import TabNavigator from "./app/tab.routes";

const AppRoutes = () => {
    return(
        <DrawerNavigator/>
    );
}

export default AppRoutes;