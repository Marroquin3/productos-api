import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

const productosFile = path.join(process.cwd(), "data", "productos.json");

router.get("/", (req, res) => {
    const productos = readFile();
    res.json(productos);
});

router.post("/", (req, res) => {
    const newProducto = req.body;
    saveFile(newProducto);
    res.json("El producto se ha guardado exitosamente");
});

router.delete("/:Id", (req, res) => {
    const productoId = parseInt(req.params.Id);
    const productos = readFile();

    const productoIndex = productos.findIndex(producto => producto.Id === productoId);
    if (productoIndex === -1) {
        return res.status(404).json({ message: 'El producto no se encontró' });
    }

    const productoEliminado = productos.splice(productoIndex, 1);
    saveFile(productos);

    res.json({ message: 'El producto se eliminó correctamente', productos, productoEliminado });
});

function readFile() {
    const result = fs.readFileSync(productosFile, "utf-8");
    const json = JSON.parse(result);
    return json;
}

function saveFile(producto) {
    const productos = readFile();

    const todosLosId = productos.map((producto) => producto.Id);
    const nuevoId = Math.max(...todosLosId, 0) + 1;

    const nuevoProducto = { ...producto, Id: nuevoId };

    const contenidoNuevo = [...productos, nuevoProducto];

    fs.writeFileSync(productosFile, JSON.stringify(contenidoNuevo, null, 2));
}

export default router;