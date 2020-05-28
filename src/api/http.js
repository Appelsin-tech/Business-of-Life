import axios from 'axios'

const axiosCreate = axios.create({
  baseURL: 'https://api.businessof.life',
  timeout: 20000,
  withCredentials: true
})

export const HTTP = axiosCreate
