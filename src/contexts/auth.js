import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as auth from '../services/auth';
import api from "../services/api";


const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        async function loadStorageData(){
            const storagedUser = await AsyncStorage.getItem('@HacssaAuth:user');
            const storagedToken = await AsyncStorage.getItem('@HacssaAuth:token');

            if(storagedUser && storagedToken){

                api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;

                setUser(JSON.parse(storagedUser));
            }

            setLoading(false);
        }

        loadStorageData();
    }, []);

    async function singIn() {
        const response = await auth.singIn();

        setUser(response.user);

        api.defaults.headers['Authorization'] = `Bearer ${response.token}`;


        await AsyncStorage.setItem('@HacssaAuth:user', JSON.stringify(response.user));
        await AsyncStorage.setItem('@HacssaAuth:token', response.token);


    }

    async function singOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }

    return(
        <AuthContext.Provider value={{signed: !!user, user, loading, singIn, singOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    const context = useContext(AuthContext);

    return context;
}