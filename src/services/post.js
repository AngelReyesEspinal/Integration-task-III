import axios from 'axios'

const apiUrl = 'https://bd291e06fa9b.ngrok.io/'

async function post (endpoint, model) {
    return axios.post(`${apiUrl}${endpoint}`,  model);
}

export default post