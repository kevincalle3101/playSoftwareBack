import express from 'express';
import http from 'http';
import { v2 as cloudinary } from 'cloudinary';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import router from './router';

dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(bodyParser.json());

const server = http.createServer(app)

const PORT = process.env.APP_PORT || 3001;

server.listen( PORT || 3001, ()=>{
    console.log(`Server running on http://localhost:${PORT}/`);
    
})

const MONGO_URL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.tekq5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());

app.get('*', function(req, res){
    res.status(404).send('Route not found');
  });

