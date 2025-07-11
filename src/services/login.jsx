import axios from 'axios'
const baseUrl = '/api/login'

axios.defaults.withCredentials = true;

const login = (loginInfo) => {
    console.log('login running');
    return axios.post(baseUrl, loginInfo, {
        headers: {
            "Content-Type": 'application/json'
        },
        withCredentials: true
    })
}

const refresh = () => {
    console.log('refresh of access token running running; loginService');
    return axios.post(`${baseUrl}/refresh`, {
        headers: {
            "Content-Type": 'application/json'
        },
        withCredentials: true
    })
}

const logout = () => {
    console.log("logging out...");
    return axios.post(`${baseUrl}/logout`, {
        withCredentials: true
    })
}

export default { login, refresh, logout }