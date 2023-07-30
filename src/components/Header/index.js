import {React, useContext} from "react";
import { 
    View,
    TouchableOpacity,
    StyleSheet, 
    Text,
    StatusBar
 } from "react-native";
import AuthContext from "../../contexts/auth";
import { Feather } from '@expo/vector-icons';
import { statusBarHeight } from "../../../assets/styles/app";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        paddingTop: statusBarHeight,
        flexDirection: 'row',
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 20,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 30
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    roleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 10,
        opacity: 0.7
    },
    moneyContent:{
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        marginLeft: 20
    },
    percentualContent:{
    },
    moneyValue:{
        color: "white",
        fontSize: 15,
        fontWeight: 'bold',
        width: 60
    },
    percentualMoneyValueAdmin:{
        color: "#E12E2E",
        opacity: 0.8
    },
    percentualMoneyValueSeller:{
        color: "#36BA21",
        opacity: 0.8
    }
});

const Header = (props) => {
    const { user  } = useContext(AuthContext);
    return(
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity onPress={() => props.element.openDrawer()}>
                    <Feather name="align-justify" size={40} color="white" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.text}>
                        {'Olá, '+user.name}
                    </Text>
                    <Text style={styles.roleText}>
                        {"("+user.role+")"}
                    </Text>
                </View>
                <View style={styles.moneyContent}>
                    <Text style={styles.moneyValue}>
                        {"R$:"}
                        {user.money}
                    </Text>
                    <View style={styles.percentualContent}>
                        <Text style={styles.percentualMoneyValueAdmin}>
                            {"R$:\t"}
                            {user.money*0.8}
                            {"\t(80%)"}
                        </Text>
                        <Text style={styles.percentualMoneyValueSeller}>
                            {"R$:\t"}
                            {user.money*0.2}
                            {"\t(20%)"}
                        </Text>
                    </View>
                </View>
            </View>
        </View> 
    );
}

export default Header;