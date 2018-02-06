import axios from 'axios'

export default axios.create({
    baseURL: 'http://api.geoquizz.local:10080/',
});