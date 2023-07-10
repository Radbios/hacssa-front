import {React, useContext} from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import AuthContext from "../../contexts/auth";
import Header from "../../components/Header";

const styles = StyleSheet.create({
    container: {
    }
});

const Dashboard = ({navigation}) => {
    const {  user, singOut } = useContext(AuthContext);
    
    async function handleSignOut(){
        await singOut();
    }

    return(
        <View style={styles.container}>
            <Header  element = {navigation} />
            <Text>{user?.name}</Text>
            <Button title="Logout" onPress={handleSignOut} />
        </View> 
    );
}

export default Dashboard;