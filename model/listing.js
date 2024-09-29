const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename:String,
    url:String,
    type: String,
    default:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2FDesirous-sunset-scenery-beautiful-nature%2Fdp%2FB094761HNG&psig=AOvVaw2b5p8DVhEGzvIL9qiOfQrE&ust=1722359104624000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNDm6ebdzIcDFQAAAAAdAAAAABAE",
    set: (v) =>
      v === ""
        ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2FDesirous-sunset-scenery-beautiful-nature%2Fdp%2FB094761HNG&psig=AOvVaw2b5p8DVhEGzvIL9qiOfQrE&ust=1722359104624000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNDm6ebdzIcDFQAAAAAdAAAAABAE"
        : v,
  },
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review"
    },
  ],
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
