

const express = require("express");
const mongodb =require("mongodb");


const app =express();
const port =process.env.port || 3000
const mongoClient =mongodb.MongoClient
const objectId = mongodb.ObjectID;
const dbUrl = 'mongodb://localhost:27017'

app.use(express.json());


app.get('/',(req,res)=>{
    mongoClient.connect(dbUrl,(err, client)=>{
        if(err) throw err;
        let db= client.db('myDB')
        db.collection('users').find().toArray().then(data=>{
            res.status(200).json(data)
        }).catch(error=>{
            res.status(404).json({message:'No data found'})
            console.log(error);
        })
    })

});

app.post('/create', async(req,res)=>{
    try{

    let client =await mongoClient.connect(dbUrl)
    let db = client.db('myDB')
    await db.collection("users").insertOne(req.body)
    res.status(200).json({message:"created"});
    client.close();
    }catch(error){

console.log(error);
res.status(500).json({message:"Internal Server Error"});
client.close();
    }
})

app.put('/update/:id', async(req,res)=>{
    try{

    let client =await mongoClient.connect(dbUrl)
    let db = client.db('myDB')
    await db.collection("users").findOneAndUpdate({_id:objectId(req.params.id)},{$set:req.body});
    res.status(200).json({message:"updated"});
    client.close();
    }catch(error){

console.log(error);
res.status(500).json({message:"Internal Server Error"});
client.close();
    }
})


app.delete('/delete/:id', async(req,res)=>{
    try{

    let client =await mongoClient.connect(dbUrl)
    let db = client.db('myDB')
    await db.collection("users").deleteOne({_id:objectId(req.params.id)});
    res.status(200).json({message:"deleted"});
    client.close();
    }catch(error){

console.log(error);
res.status(500).json({message:"Internal Server Error"});
client.close();
    }
})


app.listen(port,()=>console.log("your node runs with port3000"));