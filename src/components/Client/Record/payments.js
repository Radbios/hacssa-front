import {React} from "react";
import { View, Button, StyleSheet, Text, ScrollView } from "react-native";
import { 
    statusBarHeight,
    yellowColorTheme
 } from "../../../../assets/styles/app";
import moment from "moment";

const styles = StyleSheet.create({
    text:{
        color: 'white',
        fontSize: 16
    },
    titleText: {
        color: "white",
        fontSize: 20,
    },
    linhaBranca:{
        backgroundColor: "white",
        height: 1,
        marginTop: 5,
        marginBottom: 5,
    },
    btnAtivo: {
        backgroundColor: yellowColorTheme
    },
    itemList: {
        height: 75,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    contentValues: {
        alignItems: "center",
        width: 75,
        textAlign: "center",
    },
    date: {
        width: 100,
        textAlign: "center",
    },
    titleTable: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    }
});

const PaymentRecord = ({client}) => {
    return(
        <View>
            <View style={styles.titleTable}>
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
                        client.payments.map((payment) => {
                            return(
                                <View>
                                    <View key={payment.id} 
                                        style={styles.itemList}
                                    >   
                                        <Text style={[styles.text, styles.date]}>
                                            {moment(payment.date).format('DD/MM/YYYY')}
                                        </Text>
                                        <View style={styles.contentValues}>
                                            <Text style={styles.titleText}>
                                                {"R$:"+payment.value}
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

export default PaymentRecord;