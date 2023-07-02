import {React, useContext} from "react";
import { View, Button, StyleSheet } from "react-native";
import AuthContext from "../../contexts/auth";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

const SingIn = () => {
    const { signed, singIn, user } = useContext(AuthContext);

    console.log(signed);
    console.log(user);
    
    async function handleSignIn(){
        singIn();
    }

    return(
        <View style={styles.container}>
            <Button title="Sing in" onPress={handleSignIn} />
        </View> 
    );
}

export default SingIn;