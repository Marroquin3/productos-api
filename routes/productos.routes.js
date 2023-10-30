import { Router } from 'express'
import fs from 'fs'
import path from 'path'

const router = Router()

const productosFile = path.join(process.cwd(), "data", "productos.json")

router.get("/", (req, res)=>{
    const productos = readFile()
    res.json(productos)
    })

    function readFile(){
        const result = fs.readFileSync(productosFile, "utf-8")
        const json = JSON.parse(result)
        return json
    }

    export default router
