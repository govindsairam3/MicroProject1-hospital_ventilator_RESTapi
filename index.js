const express= require('express')
const app= express();
var jwt= require("jsonwebtoken")
var middleware = require("./middleware.js")
var secret='apiproject'
app.use(express.json());


app.get("/hos",middleware.checkToken,function(req,res){
        
            var a =req.query.hid
            var b =req.query.status
            db.collection("ventilatordetail").find({hid:a,status:b},{projection:{_id:0,ventilatorid:1,name:1}}).toArray(function(err,data){
            
                res.send(data)

        
        });


    });


const MongoClient=require('mongodb').MongoClient;
const url='mongodb://127.0.0.1:27017';
const dbName='hospitalinventory';

    let db
    MongoClient.connect(url,(err,client)=>{
        if(err)return console.log(err);
        db=client.db(dbName);
        console.log(`Connected Database:${url}`);
        console.log(`Database:${dbName}`);
    });
    

    //adding hospitals to the database

    app.get("/hospitaldetail",middleware.checkToken,function(req,res){
        db.collection('hospitaldetail').find({}).toArray(function(err,data){
            res.send(data);
        });
    });

    app.post('/hospitaldetail',middleware.checkToken,function(req,res){
        var a = req.query.hid;
        var b = req.query.name;
        var c =req.query.address;
        var d = req.query.contactno;
        var e = {hid:a,name:b,address:c,contactno:d}
        db.collection('hospitaldetail').insertOne(e,function(err,re){
            res.send('inserted');
        });
    });

    //inserting ventilator to the database

    app.get("/ventilatordetail",middleware.checkToken,function(req,res){
        db.collection('ventilatordetail').find({}).toArray(function(err,data){
            res.send(data);
        });
    });

    app.post('/ventilatordetail',middleware.checkToken,function(req,res){
        var a = req.query.hid;
        var b = req.query.ventilatorid;
        var c =req.query.status;
        var d = req.query.name;
        var e = {hid:a,ventilatorid:b,status:c,name:d}
        db.collection('ventilatordetail').insertOne(e,function(err,re){
            res.send('ventilator added');
        });
    });

    //search by ventilator and hospital name

    app.get('/ventilatordetail/available',middleware.checkToken,(req,res)=>{
        //const regex = /[^a-zA-Z\_]/g;
        db.collection('ventilatordetail').find({status:"available"}).toArray(function(err,result){
            if (err) throw err;
            res.send(result);
            console.log('found');
        });

    });
    app.get('/ventilatordetail/occupied/Apollo',middleware.checkToken,(req,res)=>{
        //const regex = /[^a-zA-Z\_]/g;
        db.collection('ventilatordetail').find({status:"occupied"},{name:'Apollo'}).toArray(function(err,result){
            if (err) throw err;
            res.send(result);
            console.log('found');
        });
    });
    app.get('/ventilatordetail/maintanance',middleware.checkToken,(req,res)=>{
        //const regex = /[^a-zA-Z\_]/g;
        db.collection('ventilatordetail').find({status:"in-maintanance"}).toArray(function(err,result){
            if (err) throw err;
            res.send(result);
            console.log('found');
        });    
     });
        
     //printing the hospital name and ventilator id

    app.get("/ventilatorid",middleware.checkToken,function(req,res){
        var a =req.query.hid
        var b =req.query.status
        db.collection("ventilatordetail").find({hid:a,status:b},{projection:{_id:0,ventilatorid:1,name:1}}).toArray(function(err,data){
            res.send(data);
        });
    }); 

    //search by hospital name
    app.get("/hospitalname",middleware.checkToken,function(req,res){
        
        db.collection("hospitaldetail").find({}, {projection:{name: 1 ,_id:0}}).toArray(function(err,data){
            res.send(data);
        });
    });
    
 




    //updating ventilators 
    app.post("/updateventilator",middleware.checkToken,function(req,res){
        var a = req.query.status
        var b = req.query.ventilatorid
        var myquery = { "ventilatorid" : b};
        var newvalues = {$set: {"status": a} };
        db.collection("ventilatordetail").updateOne(myquery, newvalues, function(err, data) {
          if (err) throw err;
          res.send(b);

          console.log('updated');
        });
      }); 
    
    app.delete("/deleteventilator",middleware.checkToken,function(req,res){
        var a = req.query.ventilatorid
        var myquery = { "ventilatorid": a };
        db.collection("ventilatordetail").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        res.send(a);
        console.log("1 document deleted");
        
  });
});

app.post('/api',middleware.checkToken,function(req,res){
    res.send('peace');
})

    app.listen(3000,()=> console.log('running on 3000')); 