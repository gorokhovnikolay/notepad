import { useDisclosure } from '@mantine/hooks'

import { createContext, ReactNode, useContext, useState } from 'react'

interface IControl {
	isEdit: boolean
	setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
	isCollapsed: boolean
	setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
	isNewNote: boolean
	setIsNewNote: React.Dispatch<React.SetStateAction<boolean>>
	idCurentNote: string
	setIdCurentNote: React.Dispatch<React.SetStateAction<string>>
	modal: {
		opened: boolean
		open: () => void
		close: () => void
		confirm: () => void
		cancel: () => void
		content: string
	}
	setModal: React.Dispatch<
		React.SetStateAction<{
			opened: boolean
			open: () => void
			close: () => void
			confirm: () => void
			cancel: () => void
			content: string
		}>
	>
	open: () => void
	opened: boolean
}

const ControlContext = createContext({} as IControl)

export const useControl = () => useContext(ControlContext)

export const ControlProvider = ({ children }: { children: ReactNode }) => {
	const [isEdit, setIsEdit] = useState(true)
	const [isNewNote, setIsNewNote] = useState(false)
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [idCurentNote, setIdCurentNote] = useState('')
	const [opened, { open, close }] = useDisclosure()
	const [modal, setModal] = useState({
		opened,
		open,
		close,
		confirm: () => {},
		cancel: () => close(),
		content: '',
	})

	const value = {
		isEdit,
		setIsEdit,
		isCollapsed,
		setIsCollapsed,
		isNewNote,
		setIsNewNote,
		idCurentNote,
		setIdCurentNote,
		modal,
		setModal,
		open,
		opened,
	}

	return <ControlContext.Provider value={value}>{children}</ControlContext.Provider>
}
