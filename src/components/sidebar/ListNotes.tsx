'use client'

import { useNotes } from '@/hooks/useNotes'

export function ListNotesSidebar() {
	const { notes, handleOpenNote } = useNotes()

	return (
		<div>
			<ul className="flex flex-col gap-1">
				{notes.map((note) => (
					<li
						key={note.id}
						className="py-1 rounded text-sm bg-background transition ease-in-out hover:bg-zinc-700 cursor-pointer"
						onClick={() => handleOpenNote(note.id)}
					>
						{note.title}
					</li>
				))}
			</ul>
		</div>
	)
}
