const mongoose=require("mongoose")
//duration will be in hours
const Plan=mongoose.model({day:Number,month:Number,year:Number,duration:Number,creationTimestamp:Number,client:String,staff:String})

//basic functionallity:
// - Staff can view, edit, delete their OWN appointments
// - Clients can view, edit, delete their OWN appointments
// - Admins can view, eit, delete ALL appointments
// - Clients can view the schedule but won't know WHO's appointment there is, only that they have one (reasonable privacy)