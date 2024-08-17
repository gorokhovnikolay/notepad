import { ref } from "firebase/database";
import { db } from "../app/firebase/config";

export const DB_NOTES = ref(db, 'notes')

export const linkWithId = (id:string)=> ref(db, `notes/${id}`)
