import axios from 'axios'
import 'dotenv/config'
import { getToken } from './utils'

const token = getToken()

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		Authorization: `Bearer ${token}`,
	},
})
