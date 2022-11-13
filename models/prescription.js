const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    medications: [
      {
        RxNORMcode: {
          type: String,
          required: true,
        },
        medicationName: {
          type: String,
          required: true,
        },
        dosage: {
          type: Number,
          required: true,
        },
        route: {
          type: String,
          required: true,
        },
        frequency: {
          type: Number,
          required: true,
        },
      },
    ],
    remarks: {
      type: String,
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Prescription", prescriptionSchema);
