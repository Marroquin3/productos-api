import express from 'express';
import { config } from 'dotenv';
config()

import productosRoutes from './routes/productos.routes.js'

const PORT = process.env.PORT || 3001;
const app = express()
app.use(express.json())

app.use("/api/productos", productosRoutes)



app.listen(3001, ()=>{
console.log(" <3 Server is runing on http://localhost:3001" + PORT)
})