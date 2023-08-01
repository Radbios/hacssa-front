import {React, useState} from "react";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import { 
    statusBarHeight,
    yellowColorTheme
 } from "../../../assets/styles/app";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import PurchaseRecord from "../../components/Client/Record/purchases";
import PaymentRecord from "../../components/Client/Record/payments";

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
        color: 'white',
        fontSize: 16
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
    contentBtnRecords:{
        flexDirection: "row",
        gap: 10,
        marginHorizontal: 10
    },
    btnRecords: {
        backgroundColor: "black",
        flex: 1,
        borderRadius: 15,
        height: 40,
        alignItems:"center",
        justifyContent: "center"
    },
    btnAtivo: {
        backgroundColor: yellowColorTheme
    },
    recordContainer:{
        flex: 1,
        padding: 5
    }
});

const ShowRecordPage = ({navigation}) => {
    const route = useRoute();
    const client = route.params.client;
    const [purchaseViewIsVisible, setPurchaseViewIsVisible] = useState(true);

    const toggleVisiblePage = () => {
        setPurchaseViewIsVisible(!purchaseViewIsVisible);
    };

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
                <View style={styles.infoStackNavigator}>
                    <Text style={styles.titleText}>
                        {"Débito\nR$:" + client.debt}
                    </Text>
                    <View style={styles.linhaBranca}></View>
                    <View style={styles.contentBtnRecords}>
                        <TouchableOpacity style={purchaseViewIsVisible ? [styles.btnRecords, styles.btnAtivo]: styles.btnRecords} onPress={toggleVisiblePage}>
                            <Text style={styles.titleText}>
                                Compras
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={purchaseViewIsVisible ? styles.btnRecords : [styles.btnRecords, styles.btnAtivo]} onPress={toggleVisiblePage}>
                            <Text style={styles.titleText}>
                                Pagamentos
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.recordContainer}>
                        {
                            purchaseViewIsVisible ? 
                                <PurchaseRecord client={client}></PurchaseRecord> 
                                :
                                <PaymentRecord client={client}></PaymentRecord>
                        }
                    </View>
                </View>
            </View>
        </View>
    );
}

export default ShowRecordPage;