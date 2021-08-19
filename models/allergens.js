const mongoose = require("mongoose");

const allergensSchema = mongoose.Schema(
  {
   
    allergy: [
      {
        api_id: {
          type: Number,
          required: true,
        },
        name: { type: String, required: true, unique: true },
        selected: { type: Boolean, required: true, default: false },
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const allergensModel = mongoose.model("Allergen", allergensSchema);

module.exports = allergensModel;
