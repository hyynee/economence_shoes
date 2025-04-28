import axios from "axios";
import { history } from "..";

export const domain = 'http://localhost:8080'
export const USERLOGIN = "userLogin";
export const http = axios.create({
    baseURL: domain,
    timeout: 30000,
})


// api 
http.interceptors.request.use((config) => {
    config.headers = { ...config.headers }
    let token = getStorageJSON(USERLOGIN)?.token
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

http.interceptors.response.use((res) => {
    return res;
}, err => {
    if (err.response?.status === 401) {
        history.push('/login')
    }
}

)

// cau hinh localStorage
export const { saveStorageJSON, getStorageJSON, clearStorageJSON } = {
    saveStorageJSON: (name, data) => {
        let sData = JSON.stringify(data)
        localStorage.setItem(name, sData);
    },
    getStorageJSON: (name) => {
        if (localStorage.getItem(name)) {
            let sData = localStorage.getItem(name);
            let data = JSON.parse(sData);
            return data;
        }
        return {};
    },
    clearStorageJSON: (name) => {
        localStorage.removeItem(name)
    }
}