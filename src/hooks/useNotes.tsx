import { IListNotesProps, getNotes } from '@/services/notes.service'
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'
import { useSidebar } from './useSidebar'

interface INotesProviderProps {
	notes: IListNotesProps
	notesOpen: IListNotesProps
	handleOpenNote: (id: string) => void
	isLoading: boolean
}

const Notes = createContext({} as INotesProviderProps)

export function NotesProvider({ children }: { children: ReactNode }) {
	const { onClose } = useSidebar()

	const [notes, setNotes] = useState<IListNotesProps>([])
	const [openersId, setOpenersId] = useState<string[]>([])
	const [notesOpen, setNotesOpen] = useState<IListNotesProps>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	async function handleGetNotes(): Promise<void> {
		setIsLoading(false)
		await getNotes()
			.then((notes) => {
				setNotes(notes)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	function handleOpenNote(id: string) {
		if (!openersId.includes(id)) {
			setOpenersId([...openersId, id])
		}
		onClose()
	}

	useEffect(() => {
		handleGetNotes()
	}, [])

	useEffect(() => {
		if (openersId) {
			for (const currentId of openersId) {
				const filtered = notes.filter(
					(currentNote) => currentNote.id === currentId,
				)[0]
				setNotesOpen([...notesOpen, filtered])
			}
		}
	}, [openersId])

	return (
		<Notes.Provider value={{ notes, notesOpen, handleOpenNote, isLoading }}>
			{children}
		</Notes.Provider>
	)
}

export function useNotes() {
	const context = useContext(Notes)
	return context
}
