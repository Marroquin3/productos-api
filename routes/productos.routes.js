import { Router } from 'express'
import fs from 'fs'
import path from 'path'

const router = Router()

const productosFile = path.join(process.cwd(), "data", "productos.json")

router.get("/", (req, res)=>{
    const productos = readFile()
    res.json(productos)
    })

    router.post("/", (req, res)=>{
        const productos = req.body
        saveFile(productos)
        res.json("El producto se a pedido exitosamente")
        })

        router.delete("/:Id", (req, res)=>{
        const todosLosId = parseInt(req.params.Id)
        const productos = productos()
        
        const productosIndex = productos.findIndex(productos => productos.Id === todosLosId);
        if(productosIndex <=0){
            return res.status(404).json({message: 'El producto no se encontro' })
        }

        const productosEliminado = productos.splice(productosIndex, 1)

        fs.writeFileSync(readFile, JSON.stringify(productos, null, 2))
    
        res.json({message: 'El producto se elimino correctamente', productos, productosEliminado})
        })

    function readFile(){
        const result = fs.readFileSync(productosFile, "utf-8")
        const json = JSON.parse(result)
        return json
    }

    function saveFile(productos){
    const contenidoActual = readFile()
    const todosLosId = contenidoActual.map((producto) => producto.Id)
    const nuevoId = Math.max(...todosLosId, 0 )+ 1

    const nuevoProducto = {...productos, Id: nuevoId}

    const contenidoNuevo = [...contenidoActual, nuevoProducto]


    fs.writeFileSync(productosFile, JSON.stringify(contenidoNuevo), null, 2);   
}
    export default router
