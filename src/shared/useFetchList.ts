import { onValue } from "firebase/database"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { DB_NOTES } from "./dataBaseRef"

interface Inote{
	id:string
	note:string
	title:string
}


export const useFetchList = ()=>{
	const [notes, setNotes] = useState<{[key:string]:Inote}>({})
	const [isLoading,setIsLoading] = useState(false)
	const location = useLocation()
	useEffect(() => {
		setIsLoading(true)
		onValue(DB_NOTES, (snapshot) => {
			if (snapshot.val()) {
				setNotes(snapshot.val())
			}
			setIsLoading(false)
		})
	}, [])

	return {notes,location,isLoading}
}
