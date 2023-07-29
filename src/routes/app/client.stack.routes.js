import { useAuth } from "../../contexts/auth";
import { createStackNavigator } from '@react-navigation/stack';
import ShowClient from "../../pages/Client/show";

const Stack = createStackNavigator();

export default function ClientStackNavigator(){

    const {  user } = useAuth();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Detalhes do cliente" component={ShowClient}/>
        </Stack.Navigator>
    ); 
}