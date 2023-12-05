import type { SpaceData } from "@lib/shared_types";
import mongoose from "mongoose";

interface SpaceDocument
  extends Omit<SpaceData, "id">, mongoose.Document {}


interface SpaceModel extends mongoose.Model<SpaceDocument> {}

// We enforce the type by adding `<CardDocument>` after `mongoose.Schema`.
const SpaceSchema = new mongoose.Schema<SpaceDocument>(
  { 
    floor: {
      type: String,
      required: true,
    },
    section:{
      type: String,
      required: true,
    },
    number:{
			type: Number,
			required: true,
    },
    priority:{
			type: Boolean,
			required: true,
    },
    occupied:{
			type: Boolean,
			required: true,
    },
    license:{
			type: String,
      default: "",
    },
    arrivalTime:{
			type: Date,
      default:"",
    },
    departureTime:{
			type: Date,
      default:"",
    },
    history:[{
			license: {
				type: String,
				required: true,
			},
			arrivalTime:{
				type: Date,
				required: true,
			},
			departureTime:{
				type: Date,
				required: false,
			},
    }]
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

const Space = mongoose.model<SpaceDocument, SpaceModel>("Space", SpaceSchema);
export default Space;
