import { Button, Modal } from '@mantine/core'
import { ref, remove } from 'firebase/database'
import { db } from '../../app/firebase/config'
import { useLocation, useNavigate } from 'react-router-dom'
import { useControl } from '../../app/providers/control-provider/ControlProvider'

interface IDel {
	close: () => void
	opened: boolean
}

export const DeleteModal: React.FC<IDel> = ({ close, opened }) => {
	const location = useLocation()
	const navigate = useNavigate()
	const { idCurentNote } = useControl()

	const deleted = () => {
		remove(ref(db, `notes/${idCurentNote}`)).then(() => {
			navigate(location.state)
			close()
		})
	}

	return (
		<Modal opened={opened} onClose={close} title='Authentication'>
			<div>Удалить заметку?</div>
			<Button onClick={deleted}>Да</Button>
			<Button onClick={close}>нет</Button>
		</Modal>
	)
}
