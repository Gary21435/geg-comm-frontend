import axios from 'axios'
const baseUrl = '/api/orders'

axios.defaults.withCredentials = true;

const getAll = () => {
    return axios.get(baseUrl, {
        withCredentials: true
    })
}

export default { getAll }