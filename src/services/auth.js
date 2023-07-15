import api from "./api";

export async function singIn(email, password){
    const response = await api.post('/login', {
        email: email,
        password: password,
    });
    return response.data;
}