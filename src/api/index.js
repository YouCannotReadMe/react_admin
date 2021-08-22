import axios from './myAxios'
import {BASE_URL} from '../config/config'

export const reqLogin = (username, password) => axios.post(`${BASE_URL}/login`,{username, password},{})