'use client'

import { api } from '@/lib/api'

export async function getNotes() {
	const res = await api.get('/notes')
	return res.data
}
