import { NavLink } from 'react-router-dom'
import { Center, Loader, Menu } from '@mantine/core'
import { IconStar } from '@tabler/icons-react'
import { useFetchList } from '../../shared/useFetchList'
import styles from './navbar.module.css'

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
						<NavLink
							className={({ isActive }) =>
								isActive ? styles.active : styles.item
							}
							to={`/${note.id}`}
							state={location.pathname}
						>
							<Menu.Item
								leftSection={<IconStar />}
								key={note.id}
								style={{ backgroundColor: 'transparent' }}
							>
								{' '}
								{note.title}
							</Menu.Item>
						</NavLink>
					)
				})}
			</Menu>
		</>
	)
}
