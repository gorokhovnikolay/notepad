import { Modal, TextInput } from '@mantine/core'
import { onValue } from 'firebase/database'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DB_NOTES } from '../../shared/dataBaseRef'

interface INote {
	note: string
	title: string
	id: string
}
interface Isearch {
	close: () => void
	opened: boolean
}

export const SearchModal: React.FC<Isearch> = ({ close, opened }) => {
	const [searchNotes, setSearchNotes] = useState<INote[]>([])
	const [searchResultNotes, setSearchResultNotes] = useState<INote[]>([])

	useEffect(() => {
		onValue(DB_NOTES, (snapshot) => {
			if (snapshot.val()) {
				setSearchNotes(Object.values(snapshot.val()))
			}
		})
	}, [])

	const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchResultNotes(() => {
			return searchNotes.filter((item) =>
				item.note.toLowerCase().includes(e.target.value.toLowerCase()),
			)
		})
	}

	return (
		<Modal
			size='xl'
			opened={opened}
			onClose={close}
			title='Поиск нужной заметки'
			overlayProps={{
				backgroundOpacity: 0.55,
				blur: 3,
			}}
		>
			<TextInput
				data-autofocus
				placeholder='Input component'
				onChange={changeSearch}
			/>
			<div>
				{searchResultNotes.map((note) => {
					return (
						<div key={note.id}>
							<Link to={`/${note.id}`} onClick={close}>
								{note.note.slice(0, 50)}
							</Link>
						</div>
					)
				})}
			</div>
		</Modal>
	)
}
