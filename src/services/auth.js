import api from "./api";

export async function singIn(email, password){
    const response = await api.post('/login', {
        email: email,
        password: password,
    });
    console.log(response)
    return response.data;
}