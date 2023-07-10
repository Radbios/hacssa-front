import {React, useContext, useEffect, useState} from "react";
import { 
    View,
    StyleSheet,
    Text,
    ActivityIndicator,
    FlatList
 } from "react-native";

import { 
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    watchPositionAsync,
    LocationAccuracy,
    getLastKnownPositionAsync
 } from "expo-location";

import moment from 'moment';
import { mapStyle } from "../../../assets/styles/map";

import MapView, {Marker} from 'react-native-maps';

import AuthContext from "../../contexts/auth";

import api from "../../services/api";
import Header from "../../components/Header";

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

const LocationPage = ({navigation}) => {

    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState(null);
    const [addresses, setAddresses] = useState(null);

    async function requestLocationPermissions() {
        const { granted } = await requestForegroundPermissionsAsync();


        if(granted){
            const currentPosition = await getCurrentPositionAsync();
            const lastPosition = await getLastKnownPositionAsync();
            
            if(currentPosition){
                setLocation(currentPosition);
            }
            else{
                setLocation(lastPosition);
            }
            setLoading(false);
        }
    }

    async function getAddresses(){
        const response = await api.get('/addresses');
        var res = response.data;
        setAddresses(res.data);
    }

    useEffect(() => {
        requestLocationPermissions();
        console.log('UPDATED');
        getAddresses()
    }, []);

    useEffect(() => {
        watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1
        }, (response) => {
            setLocation(response);
        });
    }, []);

    
    if(loading){
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#666" />
            </View>
        );
    }

    return(
        <View style={styles.container}>
            <Header  element = {navigation} />

            {location && 
                <MapView 
                    style={styles.map}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}
                    customMapStyle={mapStyle}
                >
                    <Marker 
                        title="Posição atual"
                        description="Atualmente estou nesta posição"
                        pinColor= 'blue'
                        coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
                    />
                    {
                        addresses &&
                            addresses.map((marker) => {
                                return(
                                    <Marker
                                        title={marker.client.name + "\t(R$:"+ marker.client.debt +")"}
                                        description={
                                            "Ultima compra :" + moment(marker.client.last_purchase_date).format('DD/MM/YYYY')
                                        }
                                        key={marker.id}
                                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                                    >
                                        
                                    </Marker>
                                )
                            })
                    }
                </MapView>
            }
        </View> 
    );
}

export default LocationPage;