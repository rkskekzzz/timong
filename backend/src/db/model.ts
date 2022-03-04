import { Schema, model } from "mongoose";
import { Calendar, ScheduleValidType } from "../interface/entity";

const schema = new Schema<Calendar>(
  {
    name: {
      type: String,
      required: true,
    },
    start: { type: String, required: false },
    end: { type: String, required: false },
    users: [
      {
        name: { type: String, required: true },
        color: { type: String, required: true },
        schedules: [
          {
            valid: {
              type: String,
              required: true,
              enum: ScheduleValidType,
            },
            start: { type: String, required: true },
            end: { type: String, required: true },
            posibleTime: {
              type: [Number],
              required: true,
              default: [],
            },
            imposibleTime: {
              type: [Number],
              required: true,
              default: [],
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default model<Calendar>("Calendar", schema);
