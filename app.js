const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const MongoClient = require('mongodb').MongoClient;
const ObjectID= require('mongodb').ObjectID;
const DBUrl ="mongodb://127.0.0.1:27017/";
const DBName = "iqbalf";

let dbo=null;
MongoClient.connect(DBUrl,(error,db)=>{
    if(error) throw error;
    dbo =db.db(DBName);
})

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/siswa', function (request, response){
    dbo.collection("movie").find().toArray((error,res)=>{
        if(error) throw error;
        response.json(res);
    })
})

app.get('/siswa/:id',(req, response)=>{
    let id = req.params.id;
    let id_object = new ObjectID(id);
    dbo.collection("movie").findOne({"_id":id_object},(error,res)=>{
        if(error) throw error;
        response.json(res);
    })
})

app.post('/siswa',(req, res)=>{
    let namaSiswa = req.body.nama;
    let alamatSiswa = req.body.alamat;
    res.end('Menampilkan Siswa dengan nama : '+namaSiswa+' alamat : '+alamatSiswa);
})

app.delete('/siswa/:nama',(req,res)=>{
    let namaSiswa = req.params.nama;
    res.end('Siswa Bernama '+namaSiswa+' Berhasil di Hapus');
})


app.put('/siswa/:id',(req, res)=>{
    let id = req.params.id;
    let namaSiswa = req.body.nama;
    let alamatSiswa = req.body.alamat;
    res.end('Berhasil diUbah Siswa dengan id :'+id+' nama : '+namaSiswa+' alamat : '+alamatSiswa);
})

app.listen('3000',(e)=>{
    console.log(e);
})