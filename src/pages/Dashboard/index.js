import {React, useContext} from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import AuthContext from "../../contexts/auth";
import Header from "../../components/Header";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content:{
        backgroundColor: "#DEDBDB",
        flex: 1,
        paddingTop: 30,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
});

const Dashboard = ({navigation}) => {
    const {  user, singOut } = useContext(AuthContext);
    console.log(user)
    

    return(
        <View style={styles.container}>
            <Header  element = {navigation} />
            <View style={styles.content}>
               

            </View>
        </View> 
    );
}

export default Dashboard;