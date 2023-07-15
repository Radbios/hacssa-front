import { createDrawerNavigator } from "@react-navigation/drawer";
import {Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import TabNavigator from "./tab.routes";
import { useAuth } from "../../contexts/auth";
import CustomDrawer from "../../components/CustomDrawer";
import { color } from "react-native-reanimated";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator(){

    const {  user } = useAuth();

    return (
        <Drawer.Navigator
            screenOptions={{
               headerShown: false,
               drawerStyle: {
                    backgroundColor: 'black',
                    width: 240,
                },
                drawerItemStyle: {
                    backgroundColor: "rgba(182, 168, 45, 1)",
                },
                drawerLabelStyle: {
                    color: "white"
                },
            }}
            drawerContent={CustomDrawer}
            
        >
            <Drawer.Screen 
                name= {user.name}
                component={TabNavigator}
                options={{ 
                    drawerIcon: () => <Feather name="home" size={25} color="white"/>,
                    drawerLabel: 'Início'
                }}
            />
        </Drawer.Navigator>
    );
}