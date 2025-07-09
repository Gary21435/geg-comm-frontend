import axios from 'axios'
const baseUrl = '/api/orders'

const getAll = (token) => {
    return axios.get(baseUrl, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default { getAll }