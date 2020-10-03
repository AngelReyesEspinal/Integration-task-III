import axios from 'axios'

const apiUrl = 'https://bd291e06fa9b.ngrok.io/'

async function get (endpoint) {
    return axios.get(`${apiUrl}${endpoint}`);
}

export default get