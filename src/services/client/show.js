import api from "../api";

async function getClient(id){
    const response = await api.get("/clients/" + id);
    return response.data;
}

export default getClient;