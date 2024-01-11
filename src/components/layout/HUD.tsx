'use client'

import { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function HUD({ children }: { children: ReactNode }) {
	return (
		<>
			<Topbar />
			<Sidebar />
			{children}
		</>
	)
}
