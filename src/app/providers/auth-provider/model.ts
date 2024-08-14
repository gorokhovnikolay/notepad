export interface IUser {
	name: string
	email: string
}

export interface IValue {
	user: IUser
	signin: (user: IUser, navigate: () => void) => void
	signup: (navigate: () => void) => void
}

