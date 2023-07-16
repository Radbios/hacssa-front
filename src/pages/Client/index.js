import {React, useContext, useEffect, useState} from "react";
import { View, TouchableOpacity, StyleSheet, Text, ScrollView, ActivityIndicator, TextInput} from "react-native";
import AuthContext from "../../contexts/auth";
import Header from "../../components/Header";
import api from "../../services/api";
import moment from "moment";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content:{
        flex: 1,
        backgroundColor: '#DEDBDB',
        gap: 10,
        paddingBottom: 5
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
        flex: 1
    },
    inputContent: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        height: 50,
        flexDirection: "row"
    },
    search: {
        backgroundColor: "black",
        width: "80%",
        borderRadius: 15,
        color: "white",
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 25
    },
    filter:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    scrollView: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    }
});

const Client = ({navigation}) => {
    const [clients, setClients] = useState(null);
    const [search, setSearch] = useState(null);
    const [clientList, setClientList] = useState();

    async function getClients(){
        const response = await api.get("/clients");
        var res = response.data;
        setClients(res.data)
        setClientList(res.data)
    }
    useEffect(() => {
        getClients();
        setClientList(clients);
    }, []);

    useEffect(() => {
        if(search == ""){
            setClientList(clients);
        }
        else{
            if(clients){
                setClientList(
                    clients.filter(
                        (item) =>item.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
                );
            }
        }
    }, [search]);

    const handleOrderClick = () => {
        let newList = [...clientList];

        newList.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

        setClientList(newList);
    }

    return(
        <View style={styles.container}>
            <Header  element = {navigation} />
            <View style={styles.content}>
                <View style={styles.inputContent}>
                    <TextInput 
                        style={styles.search}
                        placeholder={'Pesquisar'}
                        onChangeText={setSearch}
                        value={search}
                    />
                    <TouchableOpacity style={styles.filter} onPress={handleOrderClick}>
                        <MaterialCommunityIcons name="order-alphabetical-ascending" size={35} color="black" />
                    </TouchableOpacity>
                </View>
                {
                    clientList ?
                        <ScrollView style={styles.scrollView}>
                            {
                                clientList.map((client) => {
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
                                                    {"Última compra:\t"}
                                                    {
                                                        client.last_purchase_date ?
                                                        moment(client.last_purchase_date).format('DD/MM/YYYY'): ""
                                                    }
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
        </View> 
    );
}

export default Client;