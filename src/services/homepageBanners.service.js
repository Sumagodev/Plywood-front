import { url } from './url.service'
import axios from 'axios'

const serverUrl = `${url}/homepageBanners`


export const getHomePageBannersApi = (query) => {
  return axios.get(`${serverUrl}/getHomePageBanners?${query}`)
}


