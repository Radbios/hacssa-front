import {React, useContext, useEffect, useState} from "react";
import { View, TouchableOpacity, StyleSheet, Text, ScrollView, ActivityIndicator} from "react-native";
import AuthContext from "../../contexts/auth";
import Header from "../../components/Header";
import api from "../../services/api";
import moment from "moment";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content:{
        paddingStart: 16,
        paddingEnd: 16,
        flex: 1,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#DEDBDB',
        gap: 20
    },
    itemList: {
        backgroundColor: 'black',
        height: 100,
        borderRadius: 7,
        paddingStart: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5
    },
    text: {
        color: 'white',
    },
    textName: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    textDate: {
        color: 'white',
        fontSize: 15,
        opacity: 0.6
    },
    textPrice: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    loading: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    },
    contentPrice: {
        height: "100%",
        width: "35%",
        backgroundColor: "rgba(182, 168, 45, 1)",
        borderBottomRightRadius: 7,
        borderTopRightRadius: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    clientInfo: {
    }
});

const Client = ({navigation}) => {
    const { user, singOut } = useContext(AuthContext);
    const [clients, setClients] = useState(null);

    async function getClients(){
        const response = await api.get("/clients");
        var res = response.data;
        setClients(res.data)
    }

    useEffect(() => {
        getClients();
    }, []);

    return(
        <View style={styles.container}>
            <Header  element = {navigation} />
            {
                clients ?
                    <ScrollView style={styles.content}>
                        {
                            clients.map((client) => {
                                return(
                                    <TouchableOpacity key={client.id} 
                                        onPress={ () => {
                                            console.log(client.id)
                                        }}
                                        style={styles.itemList}
                                    >
                                        <View style={styles.clientInfo}>
                                            <Text style={styles.textName}>
                                                {client.name}
                                            </Text>
                                            <Text style={styles.textDate}>
                                                {"Última compra:\t" + moment(client.last_purchase_date).format('DD/MM/YYYY')}
                                            </Text>
                                        </View>
                                        <View style={styles.contentPrice}>
                                            <Text style={styles.textPrice}>
                                                {"R$: " + client.debt}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    
                                )
                            })
                        }
                    </ScrollView>
                :
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#666" />
                </View>
            }
        </View> 
    );
}

export default Client;