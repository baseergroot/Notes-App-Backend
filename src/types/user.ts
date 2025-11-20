import { Types } from "mongoose";
import type { NoteI } from "./note";

export interface UserI {
  _id: Types.ObjectId;
  username: string;
  password: string;
  notes: Types.ObjectId[] | NoteI[]
}