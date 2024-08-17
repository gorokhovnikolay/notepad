import { Loader, SimpleGrid } from '@mantine/core'
import { useFetchList } from '../../shared/useFetchList'
import Markdown from 'marked-react'
import styles from './main.module.css'
import { useNavigate } from 'react-router-dom'
import { useControl } from '../../app/providers/control-provider/ControlProvider'
import { useEffect } from 'react'

export const MainWidget = () => {
	const { notes, isLoading } = useFetchList()
	const { setIsCollapsed } = useControl()
	const navigate = useNavigate()

	useEffect(() => {
		setIsCollapsed(true)
	}, [setIsCollapsed])

	const navigateToNote = (id: string) => {
		navigate('/' + id)
		setIsCollapsed(false)
	}

	return (
		<>
			{isLoading && <Loader />}
			<SimpleGrid cols={4}>
				{Object.values(notes).map((note) => {
					return (
						<div
							onClick={() => navigateToNote(note.id)}
							key={note.id}
							className={styles.noteItem}
						>
							<span>{new Date(Number(note.id)).toLocaleString()}</span>
							<Markdown>{note.title}</Markdown>
						</div>
					)
				})}
			</SimpleGrid>
		</>
	)
}
