import { Link } from 'react-router-dom'
import { Center, Loader, Menu } from '@mantine/core'
import { IconStar } from '@tabler/icons-react'
import { useFetchList } from '../../shared/useFetchList'

export const NavBar = () => {
	const { notes, location, isLoading } = useFetchList()
	return (
		<>
			{isLoading && (
				<Center>
					<Loader color='blue' />
				</Center>
			)}
			<Menu>
				{Object.values(notes).map((note: any) => {
					return (
						<Menu.Item
							leftSection={<IconStar />}
							key={note.id}
							style={{ marginBottom: '5px' }}
						>
							<Link to={`/${note.id}`} state={location.pathname}>
								{' '}
								{note.title}
							</Link>
						</Menu.Item>
					)
				})}
			</Menu>
		</>
	)
}
