const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsmate=require("ejs-mate");
const Review=require("./models/review.js");


main().catch(err => console.log(err));
main()
    .then(()=>{
        console.log("successful");
    })
    .catch((err)=>console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsmate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("root is working");
});
// index route
app.get("/listings",async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
    });

//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

// show route
app.get("/listings/:id",async(req,res)=>{
    let{id}=req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

//create route
app.post("/listings",async(req,res)=>{
    //let {title,description,image,price,country,location}=req.body;
    let listing=req.body;
    console.log(listing);
});

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let{id}=req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

//update route
app.put("/listings/:id",async(req,res)=>{
    let{id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//reviews post
app.post("/listings/:id/reviews",async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
    
});


//app.get("/testlisting",async(req,res)=>{
//  let sampleListing=new Listing({
//      title:"my new home",
//      description:"beach view",
//      image:"listings",
//      price:3000,
//      location:"goa,mumbai",
//      country:"india"
//});
 //   await sampleListing.save();
// console.log("sample was saved");
  //  res.send("successful testing");
//});

app.listen(8080,()=>{
    console.log("sever is listening");
});
