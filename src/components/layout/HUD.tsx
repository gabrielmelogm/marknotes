'use client'

import { NotesProvider } from '@/hooks/useNotes'
import { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function HUD({ children }: { children: ReactNode }) {
	return (
		<NotesProvider>
			<Topbar />
			<Sidebar />
			{children}
		</NotesProvider>
	)
}
