import { Button } from '@mantine/core'
import {
	IconArrowLeft,
	IconCirclePlus,
	IconEdit,
	IconTrash,
	IconLayoutSidebar,
	IconSearch,
} from '@tabler/icons-react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './button-group.module.css'
import { useControl } from '../../app/providers/control-provider/ControlProvider'

interface IButtongroup {
	handlersDel: any
	handlersSearch: any
}

export const ButtonGroup: React.FC<IButtongroup> = ({ handlersDel, handlersSearch }) => {
	const { setIsCollapsed, idCurentNote } = useControl()
	const navigate = useNavigate()
	return (
		<>
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
			<Button m='10px' title='Удалить заметку' onClick={handlersDel.open}>
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
				leftSection={<IconSearch />}
				onClick={handlersSearch.open}
			>
				Поиск
			</Button>
		</>
	)
}
