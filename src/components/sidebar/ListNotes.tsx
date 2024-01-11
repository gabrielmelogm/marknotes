interface IListNodesSidebar {
	id: string
	title: string
}

export function ListNotesSidebar() {
	const notes: IListNodesSidebar[] = [
		{
			id: 'note1',
			title: 'Lorem ipsum dolor sit',
		},
		{
			id: 'note2',
			title: 'Lorem ipsum dolor sit',
		},
	]

	return (
		<div>
			<ul className="flex flex-col gap-1">
				{notes.map((note) => (
					<li
						className="py-1 text-sm bg-background transition ease-in-out hover:bg-gray-100 cursor-pointer"
						key={note.id}
					>
						{note.title}
					</li>
				))}
			</ul>
		</div>
	)
}
