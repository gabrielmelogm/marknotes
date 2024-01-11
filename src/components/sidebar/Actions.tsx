'use client'

import PencilAltIcon from '@heroicons/react/outline/PencilAltIcon'
import { Button } from '../ui/button'

export function ActionsSidebar() {
	return (
		<div className="pb-4">
			<Button className="gap-3">
				<PencilAltIcon width={22} />
				<span>New note</span>
			</Button>
		</div>
	)
}
