import { AppShell, Burger, Button, Modal } from '@mantine/core'
import { useState } from 'react'
import { Header } from '../../widgets/header/ui'
import { Outlet } from 'react-router-dom'
import { useControl } from '../../app/providers/control-provider/ControlProvider'
import { NavBar } from '../../widgets/navbar'

export const MainPage = () => {
	const [isOpened, setIsOpened] = useState(true)
	const { modal, isCollapsed, opened } = useControl()

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
				<Outlet />
				<Modal opened={opened} onClose={modal.close} title='Authentication'>
					<div>{modal.content}</div>
					<Button onClick={modal.confirm}>Да</Button>
					<Button onClick={modal.close}>нет</Button>
				</Modal>
			</AppShell.Main>
		</AppShell>
	)
}
