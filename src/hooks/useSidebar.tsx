'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

interface ISidebarProps {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
}

const Sidebar = createContext({} as ISidebarProps)

export function SidebarProvider({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false)

	function onOpen() {
		setIsOpen(true)
	}

	function onClose() {
		setIsOpen(false)
	}

	return (
		<Sidebar.Provider value={{ isOpen, onOpen, onClose }}>
			{children}
		</Sidebar.Provider>
	)
}

export function useSidebar() {
	const context = useContext(Sidebar)
	return context
}
