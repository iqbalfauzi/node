const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const MongoClient = require('mongodb').MongoClient;
const ObjectID= require('mongodb').ObjectID;
const DBUrl ="mongodb://127.0.0.1:27017/";
const DBName = "qwerty";

let dbo=null;
MongoClient.connect(DBUrl,(error,db)=>{
    if(error) throw error;
    dbo =db.db(DBName);
})

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/siswa', function (request, response){
    dbo.collection("users").find().toArray((error,res)=>{
        if(error) throw error;
        response.json(res);
    })
})

app.get('/siswa/:id',(req, response)=>{
    let id = req.params.id;
    let id_object = new ObjectID(id);
    dbo.collection("users").findOne({"_id":id_object},(error,res)=>{
        if(error) throw error;
        response.json(res);
    })
})

app.post('/siswa',(req, response)=>{
    let username = req.body.username;
    let password = req.body.password;

    dbo.collection("users").insertOne({
        username : username,
        password : password,
    },(err,res)=>{
        if (!err) {
            response.end('Data Success');
            response.json(res);
        }else{
            throw err;
        }
    })
})

app.delete('/siswa/:id',(req,response)=>{
    let id = req.params.id;
    let id_object = new ObjectID(id);
    dbo.collection("users").remove({"_id":id_object},(error,res)=>{
        if(error) throw error;
        response.json('Berhasil Hapus '+res);
    })
})


app.put('/siswa/:id',(req, response)=>{
    let id = req.params.id;
    let id_object = new ObjectID(id);

    let username = req.body.username;
    let password = req.body.password;

    dbo.collection("users").updateOne({
        "_id":id_object
    },{$set :{
        username : username,
        password : password
    }},(err,res)=>{
        if (!err) {
            response.json(res);
            response.end('Data Updated');
        }else{
            throw err;
        }
    })
})

app.listen('3000',(e)=>{
    console.log(e);
})