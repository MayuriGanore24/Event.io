const port=4000;
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const multer=require('multer');
const path=require('path');
const cors=require('cors');
const { Console } = require('console');
app.use(express.json());
app.use(cors()); 
//connection with mongodb
mongoose.connect("mongodb+srv://Mayuri:Mayuri@eventio.bfkto.mongodb.net/EventIo")
//scema for event scheduling
const Event=mongoose.model("event",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{//if seats are available
        type:Boolean,
        default:true,
    },
})
//api creation
app.listen((port),(error)=>{
    if(!error)
    {
        console.log(`Server is running on port ${port}`);
    }
    else
    {
        console.log(`Error: ${error}`);
    }
})
app.get("/",(req,res)=>{
    res.send("Express ap running!!")
})
//Image Storage Engine
const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload=multer({
    storage:storage
})
//creating uload endpoints for image
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('event'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})
//creating api for adding event
app.post("/addevent",async(req,res)=>{
    //for auto_generating ids
    let events=await Event.find({})
    let id;
    if(events.length>0)
    {
        let last_event_array=events.slice(-1);
        let last_event=last_event_array[0];
        id=last_event.id+1;
    }
    else
    {
        id=1;
    }
    //saving event
    const event=new Event({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    })
    console.log(event);
    await event.save();
    console.log("Saved Successfully!!")
    res.json({
        success:true,
        name:req.body.name,
    })
})
//creating api for deleting an event
app.post('/removeevent',async(req,res)=>{
    await Event.findOneAndDelete({id:req.body.id});
    console.log("Deleted Event Successfully!!")
    res.json({
        success:true,
        name:req.body.name,
    })
})
//creating api for getting all events
app.get('/allevents',async(req,res)=>{
    let events=await Event.find({})
    console.log("All Events fetched Successfully!!")
    res.send(events)
})

//creating schema for user info storage
const Users =mongoose.model('Users',{
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    CartData:{
        type:Object,
    },
    Date:{
        type:Date,
        default:Date.now,
    },
})
//creating api endpoint for user registration
app.post('/signup',async(req,res)=>{
    let check=await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"user already registered with same email id"})
    }
    else{
        //creating empty cart data
        let cart={}
        for(let i=0;i<300;i++){
            cart[i]=0;
        }
        const user=new Users({
            name:req.body.username,
            email:req.body.email,
            password:req.body.password,
            CartData:cart,
        })
        await user.save();

        const data={
            user:{
                id:user.id,
            }
        }
        const token =jwt.sign(data,'secret_ecom')
        res.json({success:true,token:token})
    }
})
//creating api endpoint for user login
app.post('/login',async(req,res)=>{
    let user=await Users.findOne({email:req.body.email})
    if(user){
        const passCompare=req.body.password===user.password;
        if(passCompare)
        {
            const data={
                user:{
                    id:user.id,
                }
            }
            const token=jwt.sign(data,'secret_ecom');
            res.json({success:true,token:token})
        }
        else
        {
            res.json({
                success:false,
                errors:"Invalid Email password"
            })
        }
    }
    else
    {
        res.json({
            success:false,
            errors:"Invalid Email Address"
        })
    }
})
//creating api endpoint for new events
app.get('/upcomingevents',async(req,res)=>{
    let events=await Event.find({});
    let newEvents=events.slice(1).slice(-8);//getting recently added 8 Events
    console.log("Upcoming Events Fetched")
    res.send(newEvents);
})
//creating api for popular in sports section
app.get('/popularinSports',async(req,res)=>{
    let events=await Event.find({category:"Sports"});
    let popularEventsinSports=events.slice(0,4);
    console.log("Popular Events in Sports Fetched")
    res.send(popularEventsinSports);
})
//creating middleware to fetch user
const fetchUser=async(req,res,next)=>{
    const token=req.header('auth_token')
    if(!token){
        res.status(401).send({errors:"Oops,Invalid token!!"})
    }
    else{
        try{
            const data=jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next()
        }
        catch(error){
            res.status(401).send({errors:"Oops,Invalid token!!"})
        }
    }
}
//creating api for adding events in cart data
app.post("/addtocart",fetchUser,async(req,res)=>{
    // console.log(req.body,req.user);
    console.log("Added",req.body.ItemId)
    let userData=await Users.findOne({_id:req.user.id});
    userData.CartData[req.body.ItemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{CartData:userData.CartData})
    res.send("Added to cart Successfully!!")
})
//creating endpoint to remove events from cart data
app.post("/removefromcart",fetchUser,async(req,res)=>{
    // console.log(req.body,req.user);
    console.log("Removed",req.body.ItemId)
    let userData=await Users.findOne({_id:req.user.id});
    if(userData.CartData[req.body.ItemId]>0){
    userData.CartData[req.body.ItemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{CartData:userData.CartData})
    res.send("Removed to cart Successfully!!")
    }
})
//creating endpoint to get cart data
app.post("/getcart",fetchUser,async(req,res)=>{
    console.log("Get Cart");
    let userData=await Users.findOne({_id:req.user.id});
    res.json(userData.CartData)
})