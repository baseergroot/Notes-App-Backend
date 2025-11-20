import { model, Schema } from "mongoose";
import type { UserI } from "../types/user";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Notes'
    }
  ]
})

const User = model<UserI>('User', userSchema)

export default User