import { Toaster } from '@/components/ui/toaster'
import { AuthenticationProvider } from '@/hooks/useAuth'
import { NotesProvider } from '@/hooks/useNotes'
import { SidebarProvider } from '@/hooks/useSidebar'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Marknotes',
	description: 'A markdown editor',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="pt-BR" className="dark">
			<body className={`${inter.className} dark:text-zinc-200`}>
				<AuthenticationProvider>
					<SidebarProvider>
						{children}
						<Toaster />
					</SidebarProvider>
				</AuthenticationProvider>
			</body>
		</html>
	)
}
