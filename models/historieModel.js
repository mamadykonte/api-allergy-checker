const mongoose = require("mongoose");

const historieSchema = mongoose.Schema({
    // Allergen: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Allergen",
    // },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    api_id: {
        type: Number,
        required:true
    },
    generic_name: {
        type: String,
        required:true
    },
    image_front_url: {
        type: String,
        required:true
    },
    // Allergen: {
    //     type:Boolean
    // },
    isFavorite: {
        type: Boolean,
        // default:false
    },
    



},
{
    timestamps: true
});


const historieModel = mongoose.model("Historie", historieSchema);

module.exports = historieModel;
