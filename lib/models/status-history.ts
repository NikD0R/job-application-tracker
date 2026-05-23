import mongoose, { Schema, Document } from "mongoose";

export interface IStatusHistory extends Document {
  jobApplicationId: mongoose.Types.ObjectId;
  userId: string;
  fromColumnId: mongoose.Types.ObjectId;
  toColumnId: mongoose.Types.ObjectId;
  fromColumnName: string;
  toColumnName: string;
  changedAt: Date;
}

const StatusHistorySchema = new Schema({
  jobApplicationId: {
    type: Schema.Types.ObjectId,
    ref: "JobApplication",
    required: true,
    index: true,
  },
  userId: {
    type: String,
    required: true,
  },
  fromColumnId: {
    type: Schema.Types.ObjectId,
    ref: "Column",
    required: true,
  },
  toColumnId: {
    type: Schema.Types.ObjectId,
    ref: "Column",
    required: true,
  },
  fromColumnName: {
    type: String,
    required: true,
  },
  toColumnName: {
    type: String,
    required: true,
  },
  changedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.StatusHistory ||
  mongoose.model<IStatusHistory>("StatusHistory", StatusHistorySchema);
