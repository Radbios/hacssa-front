import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { useAuth } from "../../contexts/auth";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const Dashboard = () => {
    const {  user, singOut } = useAuth();
    
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