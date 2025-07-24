import axios from 'axios'
const baseUrl = '/api/users'

// Retrieving all the users
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }