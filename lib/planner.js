const mongoose=require("mongoose")
//duration will be in hours
const Plan=mongoose.model({start:Number,end:Number,creationTimestamp:Number,client:String,staff:String})

function makePlan(start,end,topic,client,stamp,cb)//topic is something like "accounting" or "finance", basically a department
{
	if(availability[topic]==null || topic==null) topic="other"
	let found=false;
	for(staff in availability[topic])//iterate through each staff member
	{
		if(found) break;
		if(new Date(start).getHours()>=availability[topic][staff].availability.start && new Date(end).getHours()<=availability[topic][staff].availability.end)
		{//inside staff shift
			Plan.findOne({staff:availability[topic][staff].username,start:{$lte:end},end:{$gte:start}},function(e,o){
			if(o==null)//staff is availible
			{
				new Plan({client:client,staff:availability[topic][staff].username,start:start,end:end}).save();
				found=true;
				cb({avail:true,start:start,end:end,staff:availability[topic][staff].username});
			}else{}//inside shift, but staff is booked for timeframe. Not the end of the world because there is other staff
			})//maybe handle res here?
		}
	}
	setTimeout(function(){if(!found) cb({avail:false})},1000)//should use promises? this is a bad hack, I'm in a rushh
}
//basic functionallity:
// - Staff can view, edit, delete their OWN appointments
// - Clients can view, edit, delete their OWN appointments
// - Admins can view, eit, delete ALL appointments
// - Clients can view the schedule but won't know WHO's appointment there is, only that they have one (reasonable privacy)