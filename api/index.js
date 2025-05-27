import express from 'express'
import { config } from 'dotenv'
import connectToDb from './db/connection.js'
import cookieParser from 'cookie-parser'
import path from 'path';
import { ErrorMiddleware } from './utils/error.js';
import Routes from './routes/index.route.js'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
config()
app.use(cookieParser())
app.use(express.json())

app.listen(process.env.PORT, ()=>{
    console.log('server start running on port :',process.env.PORT)
    connectToDb()
})

//const __dirname = path.resolve()

app.use('/api', Routes)
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use(express.static(path.join(__dirname,'/client/dist')))

// app.get('*',(req,res)=>{
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// })

app.use(ErrorMiddleware)