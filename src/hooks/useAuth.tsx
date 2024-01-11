'use client'

import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'

import { getToken, getUserByToken } from '@/lib/utils'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { redirect, usePathname } from 'next/navigation'
import { setCookie } from 'nookies'

export interface UserPayload {
	sub: string
	email: string
	iat: number
	exp: number
}

type AuthenticationProps = {
	LogIn: (username: string, password: string) => Promise<void>
	isLogin: boolean
	user: UserPayload | null
}

type AuthenticationProviderProps = {
	children: ReactNode
}

const Authentication = createContext({} as AuthenticationProps)

export function AuthenticationProvider({
	children,
}: AuthenticationProviderProps) {
	const [userData, setUserData] = useState<UserPayload | null>(null)

	const isLogin = !!userData

	const user = getUserByToken()

	const pathname = usePathname()

	useEffect(() => {
		const token = getToken()
		if (pathname === '/auth/login') {
			if (token) redirect('/')
		} else {
			if (!token) redirect('/auth/login')
		}
	}, [pathname])

	async function LogIn(email: string, password: string) {
		await axios
			.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
				email,
				password,
			})
			.then(({ data }) => {
				if (data.token) {
					setCookie(undefined, 'marknotes.token', data.token, {
						maxAge: 60 * 60 * 1, // 1 hour
						path: '/',
						withCredentials: true,
					})
					setUserData(jwtDecode(data.token))
				}
			})
			.catch((error) => console.error(error))
	}

	return (
		<Authentication.Provider value={{ LogIn, isLogin, user }}>
			{children}
		</Authentication.Provider>
	)
}

export function useAuth() {
	const context = useContext(Authentication)
	return context
}
