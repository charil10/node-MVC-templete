import 'dotenv/config'
import express, { Router } from "express";
import cors from './Common/cors.js';
import path from 'path';
import { fileURLToPath } from 'url';
import EventEmitter from "events";
import limiter from './Middleware/rateLimiter.js';
EventEmitter.prototype._maxListeners = Infinity;
const app = express();
const port = process.env.PORT || 4200;


//================BASIC SHIT HERE============//
app.use(express.json()); 
app.use(cors);
app.use(limiter);
app.set('trust proxy', 1);  //High Traffic Behind Proxies: If your app is running behind a reverse proxy (e.g., Nginx), you should configure the middleware to trust the headers forwarded by the proxy using app.set('trust proxy', 1);. This ensures the rate limiter sees the correct IP address for each client.

//================File handeling=============//
// Determine the current file's directory.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectoryPath = path.join(__dirname, 'static');
app.use(express.static(publicDirectoryPath));

//===================ROUTES===========================//




//===================================================//

app.get('/images/:path' , (req,res, next)=>{
    return res.sendFile(publicDirectoryPath +"/banner/"+req.params.path);
  })

  

  app.get('/',(req,res)=>{
    try {
      return res.json("Working Fine....!!!!!")
    } catch (error) {
      console.log(error)
      return res.json(error)
    }
  })

  app.listen(port, () => {
    console.log(`app running on port ${port}...`);
  });
