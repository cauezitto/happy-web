import axios from 'axios'

const devAPI = 'http://localhost:3333'
const deplotAPI = 'https://stonks-test-api.herokuapp.com'

const api = axios.create({
    baseURL: deplotAPI
})

export default api