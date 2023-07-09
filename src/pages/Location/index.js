import {React, useContext, useEffect, useState} from "react";
import { 
    View,
    StyleSheet,
    Text,
    ActivityIndicator
 } from "react-native";

import { 
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    watchPositionAsync,
    LocationAccuracy,
    getLastKnownPositionAsync
 } from "expo-location";

import MapView, {Marker} from 'react-native-maps';


import AuthContext from "../../contexts/auth";

import api from "../../services/api";
import { DarkTheme } from "@react-navigation/native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        flex: 1,
        width: '100%'
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    }
});

const LocationPage = () => {

    const [loading, setLoading] = useState(true);
    
    const [location, setLocation] = useState(null);

    async function requestLocationPermissions() {
        const { granted } = await requestForegroundPermissionsAsync();


        if(granted){
            const currentPosition = await getLastKnownPositionAsync();
            setLocation(currentPosition);
            setLoading(false);
        }
    }

    useEffect(() => {
        requestLocationPermissions();
    }), [];

    // useEffect(() => {
    //     watchPositionAsync({
    //         accuracy: LocationAccuracy.Highest,
    //         timeInterval: 1000,
    //         distanceInterval: 1
    //     }, (response) => {
    //         setLocation(response);
    //     });
    // }), [];

    if(loading){
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#666" />
            </View>
        );
    }
    
    return(
        <View style={styles.container}>
            {location && 
                <MapView 
                    style={styles.map}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}
                >
                    <Marker 
                        title="Posição atual"
                        description="Atualmente estou nesta posição"
                        coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
                    />

                    {/* {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                            title={marker.title}
                        />
                    ))} */}
                </MapView>
            }
        </View> 
    );
}

export default LocationPage;