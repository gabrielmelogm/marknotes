'use client'

import { UserPayload } from '@/hooks/useAuth'
import { type ClassValue, clsx } from 'clsx'
import { jwtDecode } from 'jwt-decode'
import { parseCookies } from 'nookies'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getToken(): string {
	const { 'marknotes.token': token } = parseCookies()

	return token
}

export function getUserByToken(): UserPayload | null {
	const token = getToken()

	if (!token) return null

	const decode: UserPayload = jwtDecode(token)
	return decode
}
