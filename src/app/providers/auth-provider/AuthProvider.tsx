import { createContext, ReactNode, useContext, useState } from 'react'
import { IValue, IUser } from './model'

const AuthContext = createContext({} as IValue)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState({ email: '', name: '' } as IUser)

	const signin = (user: IUser, navigate: () => void) => {
		setUser(user)
		navigate()
	}
	const signup = (navigate: () => void) => {
		setUser({ name: '', email: '' })
		navigate()
	}

	const value = {
		user,
		signin,
		signup,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
