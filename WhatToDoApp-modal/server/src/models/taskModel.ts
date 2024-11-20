import mongoose, { Document, Schema } from "mongoose";

enum TaskStatusEnum {
  new = "new",
  inprogress = "inprogress",
  done = "done",
}

// TypeScript-rajapinta Task-datalle
export interface ITask extends Document {
  name: string;
  content: string;
  startDate: Date;
  endDate: Date;
  status: TaskStatusEnum;
}

// Mongoose-schema Task-mallille
const taskSchema: Schema = new Schema(
  {
    name: { type: String, required: true }, // Tehtävän nimi
    content: { type: String, required: true }, // Tehtävän sisältö
    startDate: { type: Date, required: false }, // Tehtävän aloituspäivämäärä
    endDate: { type: Date, required: false }, // Tehtävän päättymispäivämäärä
    status: { type: String, enum: Object.values(TaskStatusEnum) },
  },
  {
    timestamps: true, // Luo createdAt ja updatedAt -kentät automaattisesti
    collection: "Tasks", // Määrittää käytettävän kokoelman nimen
  }
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
