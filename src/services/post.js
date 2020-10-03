import axios from 'axios'

const apiUrl = 'https://2d9643843fb1.ngrok.io/'

async function post (endpoint, model) {
    return axios.post(`${apiUrl}${endpoint}`,  model);
}

export default post