import { model, Schema } from "mongoose";


const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  }
})

const Notes = model('Notes', noteSchema)

export default Notes