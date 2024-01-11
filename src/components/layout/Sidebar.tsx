'use client'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ActionsSidebar } from '../sidebar/Actions'
import { ListNotesSidebar } from '../sidebar/ListNotes'
import { Sheet, SheetContent } from '../ui/sheet'

export function Sidebar() {
	const queryClient = new QueryClient()

	return (
		<Sheet open>
			<SheetContent side="left">
				<QueryClientProvider client={queryClient}>
					<ActionsSidebar />
					<ListNotesSidebar />
				</QueryClientProvider>
			</SheetContent>
		</Sheet>
	)
}
