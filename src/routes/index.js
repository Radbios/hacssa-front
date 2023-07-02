import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import {useAuth} from "../contexts/auth";


const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    }
});

const Routes = () => {
    const {signed, loading} = useAuth();

    if(loading){
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#666" />
            </View>
        );
    }
    
    return signed ? <AppRoutes/> : <AuthRoutes/> 
}

export default Routes;