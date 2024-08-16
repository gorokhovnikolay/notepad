import { ref, onValue } from "firebase/database"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { db } from "../app/firebase/config"


export const useFetchList = ()=>{
	const [notes, setNotes] = useState({})
	const [isLoading,setIsLoading] = useState(false)
	const location = useLocation()
	useEffect(() => {
		setIsLoading(true)
		const notesDbRef = ref(db, 'notes')
		onValue(notesDbRef, (snapshot) => {
			if (snapshot.val()) {
				setNotes(snapshot.val())
			}
			setIsLoading(false)
		})
	}, [])

	return {notes,location,isLoading}
}
