import { Container, Flex } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { SearchModal } from '../../entities/modal-search'
import { DeleteModal } from '../../entities/modal-delete'
import { ButtonGroup } from '../../entities/button-group'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../app/providers/auth-provider/AuthProvider'

export const Header = () => {
	const [openedSearch, handlersSearch] = useDisclosure(false)
	const [openedDel, handlersDel] = useDisclosure(false)
	const { signup } = useAuth()
	const navigate = useNavigate()

	return (
		<>
			<Flex justify='space-between' align='center'>
				<Container>
					<Link to='/'>LOGO</Link>
				</Container>
				<Container size='md'>
					<ButtonGroup
						handlersDel={handlersDel}
						handlersSearch={handlersSearch}
					/>
				</Container>
				<Container>
					<span
						style={{ cursor: 'pointer' }}
						onClick={() => signup(() => navigate('/'))}
					>
						Выход
					</span>
				</Container>
			</Flex>
			<SearchModal close={handlersSearch.close} opened={openedSearch} />
			<DeleteModal close={handlersDel.close} opened={openedDel} />
		</>
	)
}
