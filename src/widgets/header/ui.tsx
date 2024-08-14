import { Button, Container, Flex } from '@mantine/core'
import {
	IconCirclePlus,
	IconEdit,
	IconLayoutSidebar,
	IconTrash,
} from '@tabler/icons-react'
import { useControl } from '../../app/providers/control-provider/ControlProvider'
import { Link, useNavigate } from 'react-router-dom'
import { ref, remove } from 'firebase/database'
import { db } from '../../app/firebase/config'

export const Header = () => {
	const { setIsCollapsed, idCurentNote, modal, setModal } = useControl()
	const navigate = useNavigate()

	const deleted = () => {
		setModal((p) => {
			return {
				...p,
				confirm: () => {
					remove(ref(db, `notes/${idCurentNote}`)).then(() => {
						navigate('/')
						p.close()
					})
				},
				content: `Удалить заметку ${idCurentNote}`,
			}
		})
		modal.open()
	}

	return (
		<Flex justify='space-between' align='center'>
			<Container>LOGO</Container>
			<Container size='md'>
				<Button m='10px' title='Добавить заметку'>
					<Link to='/new'>
						<IconCirclePlus />
					</Link>
				</Button>
				<Button m='10px' title='Редактировать заметку'>
					<Link to={`/${idCurentNote}/edit`}>
						<IconEdit />
					</Link>
				</Button>
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
			</Container>
			<Container>Выход</Container>
		</Flex>
	)
}
