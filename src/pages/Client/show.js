import {React, useContext, useEffect, useState} from "react";
import { View, Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import AuthContext from "../../contexts/auth";
import { statusBarHeight } from "../../../assets/styles/app";
import { useRoute } from "@react-navigation/native";
import getClient from "../../services/client/show";
import Loading from "../../components/Loading";
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3D3B3B",

    },
    content:{
        flex: 1,
        paddingTop: statusBarHeight,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    text:{
        color: 'white'
    },
    topStackNavigator: {
        marginBottom: 20
    },
    infoStackNavigator:{
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        gap: 10
    },
    titleText: {
        color: "white",
        fontSize: 20,
    },
    linhaBranca:{
        backgroundColor: "white",
        height: 1,
        marginTop: 5,
        marginBottom: 5
    },
    debtContent:{
        backgroundColor: "black",
        borderRadius: 10,
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 30
    },
    sampleContent:{
        backgroundColor: "black",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30

    },
    actionsContent: {
        flexDirection: "row",
        position: "absolute",
        bottom: 10,
        start: 25,
        gap: 20,
    },
    btnReceive: {
        backgroundColor: "green",
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 10
    },
    btnSell: {
        backgroundColor: "red",
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 10        
    }
});

const ShowClientPage = ({navigation}) => {
    const { user } = useContext(AuthContext);
    const route = useRoute();
    const clientId = route.params.clientId;

    const [client, setClient] = useState(null);

    async function handleClient(){
        const response = await getClient(clientId);
        setClient(response.data);
    }

    useEffect(() => {
        handleClient();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.topStackNavigator}>
                    <TouchableOpacity onPress={() => {
                        navigation.pop();
                    }}>
                        <Ionicons name="arrow-back" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                {
                    client ? 
                        <View style={styles.infoStackNavigator}>
                            <Text style= {styles.titleText}>
                                {client.name}
                            </Text>
                            <View style={styles.linhaBranca}></View>
                            <TouchableOpacity style={styles.debtContent} onPress={() => {
                                navigation.push("ShowClientDebtRecordPage", {client: client})
                            }}>
                                <Text style={styles.titleText}>
                                    {"Débito\nR$:" + client.debt}
                                </Text>
                                <Ionicons name="chevron-forward" size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.sampleContent}>
                                <Text style={styles.titleText}>
                                    Informações do usuário
                                </Text>
                                <Ionicons name="chevron-forward" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    :
                    <Loading></Loading>
                }
                <View style={styles.actionsContent}>
                    <TouchableOpacity style={styles.btnReceive}>
                        <Text style={styles.titleText}>
                            Receber
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSell}>
                        <Text style={styles.titleText}>
                            Vender
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default ShowClientPage;