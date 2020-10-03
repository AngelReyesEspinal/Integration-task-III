import axios from 'axios'

const apiUrl = 'https://2d9643843fb1.ngrok.io/'

async function get (endpoint) {
    return axios.get(`${apiUrl}${endpoint}`);
}

export default get