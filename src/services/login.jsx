import axios from 'axios'
const baseUrl = '/api/login'

const login = (loginInfo) => {
    console.log('login running');
    return axios.post(baseUrl, loginInfo, {
        headers: {
            "Content-Type": 'application/json'
        }
    })
}

export default { login }