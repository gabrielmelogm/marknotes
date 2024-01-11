import { Toaster } from '@/components/ui/toaster'
import { AuthenticationProvider } from '@/hooks/useAuth'
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
		<html lang="pt-BR">
			<body className={inter.className}>
				<AuthenticationProvider>
					{children}
					<Toaster />
				</AuthenticationProvider>
			</body>
		</html>
	)
}
