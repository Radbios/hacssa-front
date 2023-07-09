import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons'

import Dashboard from '../pages/Dashboard';
import LocationPage from '../pages/Location';

const Tab = createBottomTabNavigator();

export default function TabNavigator(){
    return (
        <Tab.Navigator 
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: 'black' },
                tabBarActiveTintColor: "rgba(182, 168, 45, 1)",
                tabBarInactiveTintColor: "white"
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarIcon: ({color, size}) => <Ionicons name="home" size={size} color={color} />,
                    tabBarLabel: "Início"
                }}
            />
            <Tab.Screen
                name="Clients"
                component={Dashboard}
                options={{
                    tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="card-account-details" size={size} color={color} />,
                    tabBarLabel: "Clientes"
                }}
            />
            <Tab.Screen
                name="myStore"
                component={Dashboard}
                options={{
                    tabBarIcon: ({color, size}) => <FontAwesome5 name="box" size={size} color={color} />,
                    tabBarLabel: "Meu Estoque"
                }}
            />
            <Tab.Screen
                name="Localization"
                component={LocationPage}
                options={{
                    tabBarIcon: ({color, size}) => <Ionicons name="location-sharp" size={size} color={color} />,
                    tabBarLabel: "Localização"
                }}
            />
        </Tab.Navigator>
    );
}