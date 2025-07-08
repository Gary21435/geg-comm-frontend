import axios from 'axios'
const baseUrl = '/api/orders'

const getAll = () => {
    return axios.get(baseUrl)
}

export default { getAll }