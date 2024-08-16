import { onValue, ref, set } from 'firebase/database'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { db } from '../../app/firebase/config'
import { useMatch, useParams } from 'react-router-dom'
import { useControl } from '../../app/providers/control-provider/ControlProvider'
import { Textarea } from '@mantine/core'
import Markdown from 'marked-react'
import { debounce } from '../../shared/debounce/debounce'

export const NotesListNote = () => {
	const [note, setNote] = useState({ id: '', title: '', note: '' })
	const [values, setValues] = useState('')
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
				setValues(snapshot.val().note)
			}
		})
	}, [id, setIdCurentNote])

	const debounseFn = useRef(debounce(requestDebounce, 1500)).current

	const changeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target
		setValues(value)
		debounseFn(value, id)
	}

	function requestDebounce(val: string, id: string): void {
		const note = {
			id,
			title: val.slice(0, 25),
			note: val,
		}
		const notesDbRef = ref(db, `notes/${id}`)
		set(notesDbRef, note)
	}

	return (
		<div>
			{match ? (
				<Textarea
					variant='unstyled'
					value={values}
					onChange={changeValue}
					size='lg'
					label={note.title}
					placeholder='Lorem ipsum dolor sit amet consectetur...'
					autosize
					minRows={2}
				/>
			) : (
				<>
					<div>Дата:{new Date(Number(note.id)).toLocaleString()}</div>
					<Markdown>{note.note}</Markdown>
				</>
			)}
		</div>
	)
}
