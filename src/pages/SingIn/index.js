import React from "react";
import { View, TouchableOpacity, StyleSheet, TextInput, Button } from "react-native";
import {useAuth} from "../../contexts/auth";
import { Text } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        gap: 20,
    },
    input:{
        backgroundColor: 'white',
        width: 200,
        height: 40,
        borderRadius: 15,
        paddingLeft: 25,
        paddingRight: 25,
    },
    option: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'center',
        alignItems:'center'
    },
    text:{
        color: 'white',
    },
    registerBtn: {
        backgroundColor: "rgba(182, 168, 45, 1)",
        width: 170,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 50
    },
    btn:{
        backgroundColor: "rgba(182, 168, 45, 1)",
        width: 100,
        height: 35,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
});

const SingIn = () => {
    const { signed, singIn, user } = useAuth();
    
    async function handleSignIn(){
        singIn();
    }

    return(
        <View style={styles.container}>
            <TextInput 
                placeholder={'email'}
                style={styles.input}
            />
            <TextInput 
                placeholder={'password'}
                style={styles.input}
                secureTextEntry={true}
            />
            <View style={styles.option}>
                <Text style={styles.text}>Esqueceu a senha?</Text>
                <TouchableOpacity onPress={handleSignIn} style={styles.btn}>
                    <Text style={styles.text}>Sing in</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.btn, styles.registerBtn]}>
                <Text style={styles.text}>Não tem uma conta?</Text>
                <Text style={styles.text}>Solicitar cadastro!</Text>
            </TouchableOpacity>
        </View>

    );
}

export default SingIn;