import { Textarea } from '@mantine/core'
import { ChangeEvent, useRef, useState } from 'react'
import { debounce } from '../../shared/debounce/debounce'
import { ref, set } from 'firebase/database'
import { db } from '../../app/firebase/config'

export const NewNotes = () => {
	const [values, setValues] = useState('')

	const debounseFn = useRef(debounce(requestDebounce, 1500)).current
	const id = useRef(Date.now()).current

	const changeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target
		setValues(value)
		debounseFn(value)
	}

	function requestDebounce(val: string): void {
		const note = {
			id,
			title: val.slice(0, 50),
			note: val,
		}
		const notesDbRef = ref(db, `notes/${id}`)
		set(notesDbRef, note)
	}

	return (
		<Textarea
			autosize
			placeholder='Новая заметка'
			onChange={changeValue}
			value={values}
		/>
	)
}