import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { db } from '../../app/firebase/config'
import { useMatch, useParams } from 'react-router-dom'
import { useControl } from '../../app/providers/control-provider/ControlProvider'
import { Textarea } from '@mantine/core'

export const NotesListNote = () => {
	const [note, setNote] = useState({ title: '', note: '' })
	const { id } = useParams()
	const { setIdCurentNote } = useControl()
	const match = useMatch(`${id}/edit`)

	useEffect(() => {
		if (id) {
			setIdCurentNote(id)
		}
		const notesDbRef = ref(db, `notes/${id}`)
		onValue(notesDbRef, (snapshot) => {
			if (snapshot.val()) {
				setNote(snapshot.val())
			}
		})
	}, [id, setIdCurentNote])

	return <div>{match ? <Textarea value={note.note} /> : <div>{note.note}</div>}</div>
}
