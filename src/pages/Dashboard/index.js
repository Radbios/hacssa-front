import {React, useContext} from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import AuthContext from "../../contexts/auth";
import Header from "../../components/Header";

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const Dashboard = ({navigation}) => {
    const {  user, singOut } = useContext(AuthContext);
    
    

    return(
        <View style={styles.container}>
            <Header  element = {navigation} />
        </View> 
    );
}

export default Dashboard;