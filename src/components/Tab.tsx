import { useNotes } from '@/hooks/useNotes'
import CloseIcon from '@heroicons/react/outline/XIcon'
import { TOPBAR_HEIGHT } from './layout/Topbar'

interface ITabProps {
	id: string
	content: string
	active?: boolean
}

export function Tab({ id, content, active }: ITabProps) {
	const { handleCloseNote } = useNotes()

	return (
		<li
			data-active={active}
			className={`
        w-[230px] h-[${TOPBAR_HEIGHT}px] px-4 data-[active]:bg-background text-xs
        flex items-center justify-between
        hover:bg-zinc-700
      `}
		>
			{content}
			<button
				type="button"
				className="text-zinc-500 rounded hover:bg-zinc-700"
				onClick={() => handleCloseNote(id)}
			>
				<CloseIcon width={18} />
			</button>
		</li>
	)
}
