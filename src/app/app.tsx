import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './providers/auth-provider/AuthProvider'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import { PrivatRoute } from './privat-route/PrivatRoute'
import { Login } from '../pages/login'
import { MainPage } from '../pages/main'
import { NotesListNote } from '../widgets/notes/ui'
import { ControlProvider } from './providers/control-provider/ControlProvider'
import { NewNotes } from '../widgets/new-notes/ui'

export const App = () => {
	return (
		<AuthProvider>
			<MantineProvider>
				<ControlProvider>
					<BrowserRouter>
						<Routes>
							<Route
								path='/'
								element={
									<PrivatRoute>
										<MainPage />
									</PrivatRoute>
								}
							>
								<Route
									path='/:id'
									element={
										<PrivatRoute>
											<NotesListNote />
										</PrivatRoute>
									}
								/>
								<Route
									path='/:id/edit'
									element={
										<PrivatRoute>
											<NotesListNote />
										</PrivatRoute>
									}
								/>
								<Route
									path='/new'
									element={
										<PrivatRoute>
											<NewNotes />
										</PrivatRoute>
									}
								/>
							</Route>
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<div>register</div>} />
							<Route
								path='*'
								element={
									<PrivatRoute>
										<div>not found</div>
									</PrivatRoute>
								}
							/>
						</Routes>
					</BrowserRouter>
				</ControlProvider>
			</MantineProvider>
		</AuthProvider>
	)
}
