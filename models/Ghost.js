import mongoose from "mongoose";
const GhostSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide ghost name"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Please provide ghost description"],
  },
  image: {
    type: String,
  },
});
module.exports = mongoose.model("Ghost", GhostSchema);
