import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { db } from '../../app/firebase/config'
import { Link } from 'react-router-dom'

export const NotesList = () => {
	const [notes, setNotes] = useState({})
	useEffect(() => {
		const notesDbRef = ref(db, 'notes')
		onValue(notesDbRef, (snapshot) => {
			if (snapshot.val()) {
				setNotes(snapshot.val())
			}
		})
	}, [])
	return (
		<div>
			{Object.values(notes).map((note: any) => {
				return (
					<div key={note.id}>
						<Link to={`/${note.id}`}>{note.title}</Link>
					</div>
				)
			})}
		</div>
	)
}
