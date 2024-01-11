'use client'

import { useSidebar } from '@/hooks/useSidebar'
import { ActionsSidebar } from '../sidebar/Actions'
import { ListNotesSidebar } from '../sidebar/ListNotes'
import { Sheet, SheetContent } from '../ui/sheet'

export function Sidebar() {
	const { isOpen } = useSidebar()

	return (
		<Sheet open={isOpen}>
			<SheetContent side="left">
				<ActionsSidebar />
				<ListNotesSidebar />
			</SheetContent>
		</Sheet>
	)
}
