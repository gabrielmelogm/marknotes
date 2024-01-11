import { ActionsSidebar } from '../sidebar/Actions'
import { ListNotesSidebar } from '../sidebar/ListNotes'
import { Sheet, SheetContent } from '../ui/sheet'

export function Sidebar() {
	return (
		<Sheet>
			<SheetContent side="left">
				<ActionsSidebar />
				<ListNotesSidebar />
			</SheetContent>
		</Sheet>
	)
}
