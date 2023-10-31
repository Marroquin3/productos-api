import { Router } from 'express'
import fs from 'fs'
import path from 'path'

const router = Router()

const productosFile = path.join(process.cwd(), "data", "productos.json")



router.get("/", (req, res)=>{
const productos = ObtenerProductos()
res.json(productos)
})

router.post("/", (req, res)=>{
    const productoNuevo = req.body;
    GuardarProductos(productos)
    res.status(200).json({message:'El producto se guardo exitosamente'})
})

function ObtenerProductos(){
    const contenido = fs.readFileSync(productosFile)
}


// router.get("/", (req, res)=>{
//     const productos = readFile()
//     res.json(productos)
//     })

//     router.post("/", (req, res)=>{
//         const productos = req.body
//         saveFile(productos)
//         res.json("El producto se a pedido exitosamente")
//         })

//         router.delete("/:id", (req, res)=>{
//         const productosId = parseInt(req.params.Id)
//         const productos = producto();

//         const productosIndex = productos.findIndex(productos => productos.Id === productosId);
//         if(productosIndex <=0){
//             return res.status(404).json({message: 'El producto no se encontro' })
//         }

//         const productosEliminado = productos.splice(productosIndex, 1)

//         fs.writeFileSync(readFile, JSON.stringify(productos, null, 2))
    
//         res.json({message: 'El producto se elimino correctamente', productos, productosEliminado})
//         })

//     function readFile(){
//         const result = fs.readFileSync(productosFile, "utf-8")
//         const json = JSON.parse(result)
//         return json
//     }

//     function saveFile(productos){
//     const contenidoActual = readFile()
//     const todosLosId = contenidoActual.map((producto) => producto.Id)
//     const nuevoId = Math.max(...todosLosId, 0 )+ 1

//     const nuevoProducto = {...productos, Id: nuevoId}

//     const contenidoNuevo = [...contenidoActual, nuevoProducto]


//     fs.writeFileSync(productosFile, JSON.stringify(contenidoNuevo), null, 2);   
// }
    export default router
