import axios from 'axios'

const axiosCli = axios.create({
    baseURL: 'http://127.0.0.1:4000/'
})

export default axiosCli