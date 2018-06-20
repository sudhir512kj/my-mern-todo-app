import mongoose from "mongoose";

var Schema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  fullName: String,
  todoText: String,
  todoDesc: String
});

export default mongoose.model("Todo", Schema);
