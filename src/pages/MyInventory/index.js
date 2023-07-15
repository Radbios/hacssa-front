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
        height: 70,
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
    contentValues: {
        height: "100%",
        width: "25%",
        backgroundColor: "rgba(182, 168, 45, 1)",
        borderBottomRightRadius: 7,
        borderTopRightRadius: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    clientInfo: {
    }
});

const MyInventory = ({navigation}) => {
    const { user, singOut } = useContext(AuthContext);
    const [inventory, setInventory] = useState(null);

    async function getInventory(){
        const response = await api.get("/myinventory");
        var res = response.data;
        setInventory(res.data)
    }

    useEffect(() => {
        getInventory();
    }, []);

    return(
        <View style={styles.container}>
            <Header  element = {navigation} />
            {
                inventory ?
                    <ScrollView style={styles.content}>
                        {
                            inventory.map((item) => {
                                return(
                                    <TouchableOpacity key={item.id} 
                                        onPress={ () => {
                                            console.log(item)
                                        }}
                                        style={styles.itemList}
                                    >
                                        <View style={styles.clientInfo}>
                                            <Text style={styles.textName}>
                                                {item.quantity + "x - " + item.product.name}
                                            </Text>
                                        </View>
                                        <View style={styles.contentValues}>
                                            <Text style={styles.textPrice}>
                                                {"R$: " + item.product.price}
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

export default MyInventory;