import { Center, Fieldset, TextInput, Button } from '@mantine/core'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../app/providers/auth-provider/AuthProvider'
import { IUser } from './model'

export const LoginForm = () => {
	const [values, setValues] = useState({} as IUser)
	const navigate = useNavigate()
	const { state } = useLocation()
	const { signin } = useAuth()

	const changeHandler = (e: React.FormEvent<HTMLFormElement>) => {
		const { name } = e.target as HTMLInputElement
		const { value } = e.target as HTMLInputElement
		setValues({ ...values, [name]: value })
	}

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		signin(values, () => navigate(state))
	}

	return (
		<Center maw={400} h={100} m='auto' mt='150px'>
			<form onChange={changeHandler} onSubmit={submitHandler}>
				<Fieldset legend='Personal information'>
					<TextInput label='Your name' name='name' placeholder='Your name' />
					<TextInput label='Email' name='email' placeholder='Email' mt='md' />
					<TextInput
						label='password'
						type='password'
						name='password'
						placeholder='password'
						mt='md'
					/>
				</Fieldset>
				<Button type='submit'>Login</Button>
			</form>
		</Center>
	)
}
