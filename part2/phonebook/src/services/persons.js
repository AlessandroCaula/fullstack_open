import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    // Directly returning the response data. Which is the only thing used in our App.jsx
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    // Directly returning the response data.
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    // Remove the contact 
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then((response) => response.data)
}

export default { getAll, create, remove, update }