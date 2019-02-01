const express=require("express");
const crypto=require("crypto")
const app=express()
const cookieParser=require("cookie-parser")
app.use(cookieParser(crypto.randomBytes(256).toString("base64")))

app.listen(80)