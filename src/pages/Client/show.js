import {React, useContext} from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import AuthContext from "../../contexts/auth";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content:{
        backgroundColor: "#DEDBDB",
        flex: 1,
        paddingTop: 30,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
});

const ShowClient = ({navigation}) => {
    const { user } = useContext(AuthContext);

    return(
        <View style={styles.container}>
            <View style={styles.content}>
                <Text>
                    ckksanda
                </Text>
            </View>
        </View> 
    );
}

export default ShowClient;