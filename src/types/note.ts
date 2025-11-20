import type { ObjectId } from "mongoose"



export interface NoteI {
  _id?: ObjectId
  title: string
  description: string,
}
