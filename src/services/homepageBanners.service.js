import { url } from './url.service'
import axios from 'axios'

const serverUrl = `${url}/BannerImage`


export const getHomePageBannersApi = (query) => {
  return axios.get(`${serverUrl}/getbanner`)
}


