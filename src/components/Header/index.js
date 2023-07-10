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

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        paddingTop: statusBarHeight,
        flexDirection: 'row',
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 35
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
    }
});

const Header = (props) => {
    const { user, singOut } = useContext(AuthContext);
    
    return(
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity onPress={() => props.element.openDrawer()}>
                    <Feather name="align-justify" size={40} color="white" />
                </TouchableOpacity>
                <Text style={styles.text}>
                    {'Olá, '+user.name + ' (role)'}
                </Text>
            </View>
        </View> 
    );
}

export default Header;