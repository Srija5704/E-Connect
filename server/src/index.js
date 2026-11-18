import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/Product.js';
import { sampleProducts } from './data.js';
dotenv.config();
const app=express(); app.use(cors({origin:process.env.CLIENT_ORIGIN || 'http://localhost:5173'})); app.use(express.json());
let dbReady=false;
if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI).then(async()=>{dbReady=true; if(await Product.countDocuments()===0) await Product.insertMany(sampleProducts.map(({_id,...p})=>p)); console.log('MongoDB connected');}).catch(e=>console.error('MongoDB connection failed; using sample data:',e.message));
}
app.get('/api/health',(req,res)=>res.json({status:'ok',database:dbReady?'connected':'sample-data'}));
app.get('/api/products',async(req,res)=>{try{const {q='',category=''}=req.query; let items=dbReady?await Product.find().lean():sampleProducts; if(category) items=items.filter(p=>p.category===category); if(q) items=items.filter(p=>`${p.name} ${p.description}`.toLowerCase().includes(q.toLowerCase())); res.json(items);}catch(e){res.status(500).json({message:'Could not load products'});}});
app.post('/api/orders',(req,res)=>{const {items=[],customer={}}=req.body||{}; if(!items.length) return res.status(400).json({message:'Cart is empty'}); const total=items.reduce((sum,item)=>sum+(Number(item.price)||0)*(Number(item.quantity)||0),0); res.status(201).json({message:'Demo order placed successfully',orderId:`DEMO-${Date.now()}`,customer,items,total,notice:'Demo only: no payment was collected.'});});
app.listen(process.env.PORT||5000,()=>console.log(`API listening on ${process.env.PORT||5000}`));
