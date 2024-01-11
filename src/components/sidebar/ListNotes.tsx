'use client'

import { getNotes } from '@/services/notes.service'
import { useQuery } from 'react-query'
import { z } from 'zod'

const notesSchema = z
	.object({
		id: z.string().uuid(),
		title: z.string(),
		content: z.string(),
	})
	.array()

type IListNodesSidebar = z.infer<typeof notesSchema>

export function ListNotesSidebar() {
	const { data: notesData } = useQuery('notes', getNotes)

	let notes = []

	if (notesData) {
		notes = notesSchema.parse(notesData)
	}

	return (
		<div>
			<ul className="flex flex-col gap-1">
				{notes.map((note) => (
					<li
						className="py-1 rounded text-sm bg-background transition ease-in-out hover:bg-zinc-700 cursor-pointer"
						key={note.id}
					>
						{note.title}
					</li>
				))}
			</ul>
		</div>
	)
}
