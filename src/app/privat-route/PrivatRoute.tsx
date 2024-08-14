import { ReactElement } from 'react'
import { useAuth } from '../providers/auth-provider/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom'

export const PrivatRoute = ({ children }: { children: ReactElement }) => {
	const { user } = useAuth()
	const location = useLocation()

	if (user.email === '' && user.name === '') {
		return <Navigate to='/login' state={location.pathname} replace />
	}
	return children
}
