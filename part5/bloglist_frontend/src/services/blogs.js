import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

// Creating new blogs. Only logged-in user are allowed to do it. 
// This means adding the token of the logged-in user to the Authorization header of the HTTP request.
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

// Retrieving all the blogs
const getAll = async () => {
  const request = await axios.get(baseUrl)
  // return request.then(response => response.data)
  return request.data
}

// Creating a new blogs. Only logged-in user are allowed to do it.
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, setToken, deleteBlog }