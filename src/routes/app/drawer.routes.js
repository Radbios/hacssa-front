import { createDrawerNavigator } from "@react-navigation/drawer";
import {Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import TabNavigator from "./tab.routes";
import { useAuth } from "../../contexts/auth";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator(){

    const {  user, singOut } = useAuth();

    return (
        <Drawer.Navigator>
            <Drawer.Screen 
                name= {user.name}
                component={TabNavigator}
                options={{ 
                    drawerIcon: ({color, size}) => <Feather name="home" size={size} color={color}/>,
                    drawerLabel: 'Início'
                }}
            />
            
            
        </Drawer.Navigator>
    );
}