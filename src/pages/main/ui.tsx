import { AppShell, Burger } from '@mantine/core'
import { useState } from 'react'
import { Header } from '../../widgets/header/ui'
import { Outlet, useLocation } from 'react-router-dom'
import { useControl } from '../../app/providers/control-provider/ControlProvider'
import { NavBar } from '../../widgets/navbar'
import { MainWidget } from '../../widgets/main'

export const MainPage = () => {
	const [isOpened, setIsOpened] = useState(true)
	const { isCollapsed } = useControl()
	const location = useLocation()

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: 'sm',
				collapsed: { desktop: isCollapsed, mobile: isCollapsed },
			}}
			footer={{ height: 60 }}
			padding='md'
		>
			<AppShell.Header>
				<Burger
					opened={isOpened}
					onClick={() => setIsOpened((p) => !p)}
					size='sm'
					hiddenFrom='sm'
				/>
				<Header />
			</AppShell.Header>

			<AppShell.Navbar p='md'>
				<NavBar />
			</AppShell.Navbar>
			<AppShell.Footer>
				<div>Footer</div>
			</AppShell.Footer>

			<AppShell.Main>
				{location.pathname === '/' ? <MainWidget /> : <Outlet />}
			</AppShell.Main>
		</AppShell>
	)
}
