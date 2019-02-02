const express=require("express");
const crypto=require("crypto");
const fs = require('fs');
const app=express();
const cookieParser = require('cookie-parser')
app.use(cookieParser(crypto.randomBytes(256).toString("base64")))
app.use('/res', express.static('res'))

const ejs=require("ejs")
const mongoose=require("mongoose");//make sure to verify email and strip special email chars?
const User=mongoose.model("User",{name:String,email:String,hash:String,salt:String,points:Number});
const Transaction=mongoose.model("Transaction",{user:String,amount:Number,operatingStatus:Number,date:Number});

const specificConfig=[];

const DEBUG=true;

//@param files []fs.Dirent
function registerPoints(e,files,dir)
{
 files.forEach(function(file){
   if(file.isDirectory())
   {
      fs.readdir(file.name,{withFileTypes:true},function(e,files){registerPoints(e,files,dir+file.name)})//recurse into directories
   }
   else//might have to add some slashes to half-assed path stuff. dir traversal should be ok because these are all non-user contributed paths.
   {
     app.get(file.name,function(req,res){
     	ejs.renderFile(dir+file.name, {mongoose:mongoose,DEBUG:DEBUG,User:User,Transaction:Transaction,Session:Session,fs:fs,app:app,req:req,res:res,crypto:crypto/*TODO: have data/variables in here. Maybe make code actually modular or in classes and pass it that way?*/}, {}, function(err, str){res.send(str);if(err) if(DEBUG) res.send(err)});
     })
   }
	//get file name
	//register endpoint
	//check if it needs to be registered as GET or POST
 }) 
}

fs.readdir("/templates/",{withFileTypes:true},function(e,files){registerPoints(e,files,__dirname+"/templates")})


class Session
{
  get isValid(){}
  get username(){}
}

app.listen(5002)