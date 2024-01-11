'use client'

import { api } from '@/lib/api'
import { z } from 'zod'

export const noteSchema = z.object({
	id: z.string().uuid(),
	title: z.string(),
	content: z.string(),
})

const notesSchema = noteSchema.array()

export type INoteProps = z.infer<typeof noteSchema>
export type IListNotesProps = z.infer<typeof notesSchema>

export async function getNotes(): Promise<IListNotesProps> {
	const res = await api.get('/notes')
	const notes = notesSchema.parse(res.data)
	return notes
}
