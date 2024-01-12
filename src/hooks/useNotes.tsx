import { IListNotesProps, INoteProps, getNotes } from '@/services/notes.service'
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'
import { z } from 'zod'
import { useSidebar } from './useSidebar'

interface INotesProviderProps {
	notes: IListNotesProps
	notesOpen: IListNotesProps
	handleOpenNote: (id: string) => void
	handleCloseNote: (id: string) => void
	isLoading: boolean
}

const Notes = createContext({} as INotesProviderProps)

export function NotesProvider({ children }: { children: ReactNode }) {
	const { onClose } = useSidebar()

	const [notes, setNotes] = useState<IListNotesProps>([])
	const [openersId, setOpenersId] = useState<string[]>([])
	const [action, setAction] = useState<'add' | 'delete' | ''>('')
	const [notesOpen, setNotesOpen] = useState<IListNotesProps>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function handleGetNotes(): Promise<void> {
		setIsLoading(true)
		await getNotes()
			.then(async (notes) => {
				setNotes(notes)
				await getNotesInMemory()
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	function handleOpenNote(id: string) {
		if (!openersId.includes(id)) {
			localStorage.setItem('openersId', JSON.stringify([...openersId, id]))
			setAction('add')
			setOpenersId([...openersId, id])
		}
		onClose()
	}

	function handleCloseNote(id: string) {
		if (openersId.includes(id)) {
			const res: string[] = JSON.parse(localStorage.getItem('openersId'))
			const listNotes = res.filter((nt) => nt !== id)
			localStorage.setItem('openersId', JSON.stringify(listNotes))
			const list = openersId.filter((currentId) => currentId !== id)
			setAction('delete')
			setOpenersId(list)
		}
	}

	async function getNotesInMemory() {
		const res = JSON.parse(await localStorage.getItem('openersId'))
		const defaultNotes = z.string().array().nullable().parse(res)
		if (defaultNotes) {
			setAction('add')
			setOpenersId(defaultNotes)
		}
	}

	function handleChangeNotesOpen(newNotes: IListNotesProps) {
		const list: IListNotesProps = []
		for (const nt of newNotes) {
			if (
				notesOpen.filter((currentNote) => currentNote.id === nt.id).length > 1
			)
				return
			list.push(nt)
		}
		setNotesOpen(list)
	}

	function filterOpenersNotes() {
		if (action === '') return

		if (action === 'add') {
			const list: IListNotesProps = []
			for (const currentId of openersId) {
				const filtered = notes.filter(
					(currentNote) => currentNote.id === currentId,
				)[0]
				list.push(filtered)
			}
			handleChangeNotesOpen(list)
		} else {
			let list: IListNotesProps = []
			for (const currentId of openersId) {
				const filtered = notes.filter(
					(currentNote) => currentNote.id === currentId,
				)
				list = filtered
			}
			handleChangeNotesOpen(list)
		}
	}

	useEffect(() => {
		handleGetNotes()
		getNotesInMemory()
	}, [])

	useEffect(() => {
		if (notes.length > 0 && openersId.length > 0) {
			filterOpenersNotes()
		}
	}, [openersId])

	return (
		<Notes.Provider
			value={{ notes, notesOpen, handleOpenNote, handleCloseNote, isLoading }}
		>
			{children}
		</Notes.Provider>
	)
}

export function useNotes() {
	const context = useContext(Notes)
	return context
}
