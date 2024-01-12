import { useNotes } from '@/hooks/useNotes'
import { Tab } from '../Tab'
import { TOPBAR_HEIGHT } from './Topbar'

export function Tabs() {
	const { notesOpen } = useNotes()

	// console.log(notesOpen)

	if (!notesOpen) {
		return <></>
	}

	return (
		<ul className={`w-full h-[${TOPBAR_HEIGHT}px] flex items-center`}>
			{notesOpen.map((note) => (
				<Tab key={note?.id} id={note.id} content={note?.title} />
			))}
		</ul>
	)
}
