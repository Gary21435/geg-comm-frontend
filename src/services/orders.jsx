import axios from 'axios'
const baseUrl = '/api/orders'

axios.defaults.withCredentials = true;

const getAll = () => {
    return axios.get(baseUrl, {
        withCredentials: true
    })
}

const updateOrder = (id, scheduleData) => {
    return axios.patch(`${baseUrl}/schedule/${id}`, scheduleData, {
        headers: {
            "Content-Type": 'application/json'
        },
        withCredentials: true
    })
}

const setSchFalse = (id) => {
    return axios.patch(`${baseUrl}/schedule/${id}/false`, {
        withCredentials: true
    })
}

const getFolast = (id) => {
    return axios.get(`${baseUrl}/vch/${id}`, {
        headers: {
            "Content-Type": 'application/json'
        },
        withCredentials: true
    })
}

export default { getAll, updateOrder, setSchFalse, getFolast }