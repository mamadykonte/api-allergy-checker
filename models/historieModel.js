const mongoose = require("mongoose");

const historieSchema = mongoose.Schema({
    Allergen: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Allergen",
    },

    Idapi: {
        type:Number
    },
    GenericName: {
        type:String
    },
    ImageFrontUrl: {
        type:String
    },
    Allergen: {
        type:Boolean
    },
    isFavorite: {
        type:Boolean
    },



});

const historieModel = mongoose.model("Historie", historieSchema);

module.exports = historieModel;
