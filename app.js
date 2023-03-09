const express= require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname));

mongoose.connect("mongodb://localhost:27017/login")
.then(()=>{
    console.log("db connected");
})
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

const Schema=new mongoose.Schema(

    {
        email:String,
        password:String
    }
)

const model=mongoose.model('data',Schema);


app.post('/',(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    const newitem= new model(
        {
            email:email,
            password:password
        }
    );
    
    newitem.save();
    res.redirect('/');
})

app.listen(3000,()=>{
    console.log("server is running");
})