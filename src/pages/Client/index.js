import {React, useContext, useEffect, useState} from "react";
import { View, TouchableOpacity, StyleSheet, Text, ScrollView } from "react-native";
import AuthContext from "../../contexts/auth";
import Header from "../../components/Header";
import api from "../../services/api";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content:{
        paddingStart: 16,
        paddingEnd: 16,
        flex: 1,
        gap: 20,
        paddingTop: 20
    },
    itemList: {
        backgroundColor: 'black',
        height: 100,
        borderRadius: 7,
    },
    text: {
        color: 'white'
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
            <ScrollView>
                <View style={styles.content}>
                    {clients &&
                        clients.map((client) => {
                            return(
                                <View style={styles.itemList} key={client.id}>
                                    <Text style={styles.text}>
                                        {client.name}
                                    </Text>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View> 
    );
}

export default Client;