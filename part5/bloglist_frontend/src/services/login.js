import axios from 'axios'
const baseUrl = '/api/blogs'

const login = async credentials => {
  // console.log(credentials)
  const response = await axios.post(baseUrl, credentials) //post
  console.log(response)
  return response.data
}

export default { login }