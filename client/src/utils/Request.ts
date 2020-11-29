import axios from 'axios'
import { MBTI_TEST_API_URL } from '../configs/apiConfig'

export const mbtiRequest = axios.create({
  baseURL: MBTI_TEST_API_URL
})

export default axios
