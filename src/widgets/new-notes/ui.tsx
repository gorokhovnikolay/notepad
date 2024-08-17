import { Textarea } from '@mantine/core'
import { ChangeEvent, useRef, useState } from 'react'
import { debounce } from '../../shared/debounce/debounce'
import { set } from 'firebase/database'
import { linkWithId } from '../../shared/dataBaseRef'

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
			title: val.slice(0, 25),
			note: val,
		}
		set(linkWithId(id.toString()), note)
	}

	return (
		<div>
			{new Date(id).toLocaleString()}
			<Textarea
				variant='unstyled'
				value={values}
				onChange={changeValue}
				size='lg'
				label='Новая заметка'
				placeholder='Lorem ipsum dolor sit amet consectetur...'
				autosize
				minRows={2}
			/>
		</div>
	)
}