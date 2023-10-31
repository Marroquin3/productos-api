import express from "express"
import { config } from "dotenv";
config()

import productosRoutes from './routes/productos.routes.js'
import usuarioRoute from './routes/Usuario.routes.js'

const PORT = process.env.PORT || 3000;
const app = express()
app.use(express.json())

app.use("/api/productos", productosRoutes)

app.use("/api", usuarioRoute)


app.listen(PORT, ()=> {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
// app.listen(3000, ()=>{
// console.log(" <3 Server is runing on http://localhost" + PORT)
// })