import {React} from "react";
import { View, Button, StyleSheet, Text, ScrollView } from "react-native";
import { 
    statusBarHeight,
    yellowColorTheme
 } from "../../../../assets/styles/app";
import moment from "moment";

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
    },
    recordContent: {
    },
    itemList: {
        height: 75,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    contentValues: {
        alignItems: "center",
        width: 75,
        textAlign: "center"
    },
    discount:{
        color: "red",
        fontSize: 13,
        opacity: 0.7
    },
    name:{
        width: 150,
        textAlign: "center",
    },
    quantity:{
        width: 30,
        textAlign: "center"
    },
    date: {
        width: 100,
        textAlign: "center"
    },
    titleTable: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});

const PurchaseRecord = ({client}) => {
    return(
        <View>
            <View style={styles.titleTable}>
                <Text style={[styles.text, styles.quantity]}>
                    Qnt
                </Text>
                <Text style={[styles.text, styles.name]}>
                    Nome
                </Text>
                <Text style={[styles.text, styles.date]}>
                    Data
                </Text>
                <Text style={[styles.contentValues, styles.text]}>
                    Valor 
                </Text>
            </View>
            <ScrollView>
                <View style={styles.recordContent}>
                    {
                        client.purchases.map((purchase) => {
                            return(
                                <View>
                                    <View key={purchase.id} 
                                        style={styles.itemList}
                                    >   
                                        <Text style={[styles.text, styles.quantity]}>
                                            {purchase.quantity + "x"}
                                        </Text>
                                        <Text style={[styles.text, styles.name]}>
                                            {purchase.product_id}
                                        </Text>
                                        <Text style={[styles.text, styles.date]}>
                                            {moment(purchase.date).format('DD/MM/YYYY')}
                                        </Text>
                                        <View style={styles.contentValues}>
                                            <Text style={styles.titleText}>
                                                {"R$:"+purchase.total}
                                            </Text>
                                            <Text style={[styles.text, styles.discount]}>
                                                {"-" + purchase.discount_unit + "%"}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.linhaBranca}></View>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    );
}

export default PurchaseRecord;