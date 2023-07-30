import { createStackNavigator } from '@react-navigation/stack';
import Client from '../../pages/Client';
import ShowClientPage from '../../pages/Client/show';
import ShowDebtRecordPage from '../../pages/Client/debtRecord';

const Stack = createStackNavigator();

export default function ClientNavigation(){
    return (
        <Stack.Navigator screenOptions={ { headerShown: false } }>
            <Stack.Screen name="Clients" component={Client}/>
            <Stack.Screen name="ShowClientPage" component={ShowClientPage}/>
            <Stack.Screen name="ShowClientDebtRecordPage" component={ShowDebtRecordPage}/>
        </Stack.Navigator>
    ); 
}