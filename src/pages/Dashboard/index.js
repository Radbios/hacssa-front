import {React, useContext} from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import AuthContext from "../../contexts/auth";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const Dashboard = () => {
    const {  user } = useContext(AuthContext);
    
    async function handleSignOut(){
        singOut();
    }

    return(
        <View style={styles.container}>
            <Text>{user?.name}</Text>
            <Button title="Logout" onPress={handleSignOut} />
        </View> 
    );
}

export default Dashboard;