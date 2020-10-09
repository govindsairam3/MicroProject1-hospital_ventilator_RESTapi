
const express = require("express")
const app= express();
const config = require("./config.js")
const bodyParser = require("body-parser")

const jwt= require("jsonwebtoken")
const k = require("./index.js")
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post("/login",function(req,res){
    var a = req.body.username;
    var b = req.body.password;
    if(a == "admin" && b=="password"){
        jwt.sign({user:{'username':a,'password':b}},config.secret,function(err,token){
            if(err){
                res.sendStatus(403);
            }else{
                res.json({
                    message:"login succefully",
                    token
                });
            }   
        });
    }else{
        res.sendStatus(403);
    }

});
console.log('ochindi')

app.listen(2000)