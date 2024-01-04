import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {

  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const removeAll = async () => {
  const blogs = await getAll()

  // Iterate through each blog and delete them one by one
  const deletePromises = blogs.map(blog => remove(blog.id))

  // Wait for all delete operations to complete
  return Promise.all(deletePromises)
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken, remove, removeAll }
