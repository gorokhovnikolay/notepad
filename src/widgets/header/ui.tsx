import { Button, Container, Flex, Modal, TextInput } from '@mantine/core'
import {
	IconArrowLeft,
	IconCirclePlus,
	IconEdit,
	IconLayoutSidebar,
	IconSearch,
	IconTrash,
} from '@tabler/icons-react'
import { useControl } from '../../app/providers/control-provider/ControlProvider'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { onValue, ref, remove } from 'firebase/database'
import { db } from '../../app/firebase/config'
import styles from './header.module.css'
import { useDisclosure } from '@mantine/hooks'
import { useEffect, useState } from 'react'

export const Header = () => {
	const { setIsCollapsed, idCurentNote, modal, setModal } = useControl()
	const [searchNotes, setSearchNotes] = useState<
		{ note: string; title: string; id: string }[]
	>([])
	const [searchResultNotes, setSearchResultNotes] = useState<
		{ note: string; title: string; id: string }[]
	>([])
	const location = useLocation()
	const navigate = useNavigate()
	const [opened, { open, close }] = useDisclosure(false)

	useEffect(() => {
		const notesDbRef = ref(db, 'notes')
		onValue(notesDbRef, (snapshot) => {
			if (snapshot.val()) {
				setSearchNotes(Object.values(snapshot.val()))
			}
		})
	}, [])

	const deleted = () => {
		setModal((p) => {
			return {
				...p,
				confirm: () => {
					remove(ref(db, `notes/${idCurentNote}`)).then(() => {
						navigate(location.state)
						p.close()
					})
				},
				content: `Удалить заметку ${idCurentNote}`,
			}
		})
		modal.open()
	}

	const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchResultNotes(() => {
			return searchNotes.filter((item) =>
				item.note.toLowerCase().includes(e.target.value.toLowerCase()),
			)
		})
	}
	return (
		<Flex justify='space-between' align='center'>
			<Container>LOGO</Container>
			<Container size='md'>
				<Button m='10px' title='Добавить заметку' onClick={() => navigate(-1)}>
					<IconArrowLeft />
				</Button>

				<Link to='/new'>
					<Button m='10px' title='Добавить заметку'>
						<IconCirclePlus />
					</Button>
				</Link>
				<Link to={`/${idCurentNote}/edit`}>
					<Button m='10px' title='Редактировать заметку'>
						<IconEdit />
					</Button>
				</Link>
				<Button m='10px' title='Удалить заметку' onClick={deleted}>
					<IconTrash />
				</Button>
				<Button
					m='10px'
					onClick={() => setIsCollapsed((p) => !p)}
					title='Свернуть список заметок'
				>
					<IconLayoutSidebar />
				</Button>
				<Button
					className={styles.searchButton}
					variant='outline'
					radius='xl'
					leftSection={<IconSearch size={14} />}
					onClick={open}
				>
					Поиск
				</Button>
			</Container>
			<Container>Выход</Container>

			<Modal
				size='xl'
				opened={opened}
				onClose={close}
				title='Authentication'
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
		</Flex>
	)
}
