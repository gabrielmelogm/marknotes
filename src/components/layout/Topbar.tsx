import { useSidebar } from '@/hooks/useSidebar'
import ViewGridIcon from '@heroicons/react/outline/ViewGridIcon'
import { Tabs } from './Tabs'

export const TOPBAR_HEIGHT: number = 40

export function Topbar() {
	const { onOpen } = useSidebar()

	return (
		<header
			className={`w-full h-[${TOPBAR_HEIGHT}px] bg-card flex items-center pl-4`}
		>
			<ul>
				<li
					className="p-1 rounded hover:bg-input cursor-pointer"
					onClick={onOpen}
				>
					<ViewGridIcon width={22} />
				</li>
			</ul>
			<Tabs />
		</header>
	)
}
