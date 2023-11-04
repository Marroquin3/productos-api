import fs from "fs";
import path from "path";
import { Router } from "express";

const router = Router();
const usuariosFile = path.join(process.cwd(), 'data', 'Usuario.json');


router.post("/login", (req, res) => {
    const { Correo, password } = req.body;
    const usuarios = ObtenerUsuario(); 


    const usuario = usuarios.find(user => user.Correo === Correo);

    if (!usuario) {
        return res.status(404).json({message: "Usuario no encontrado" });
    }


    if (usuario.password === password) {
        return res.json({usuario });
    } else {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
});

router.post("/create", (req, res) => {
    const { Correo, Password} = req.body;
    const usuarios = ObtenerUsuario();


    const usuarioExistente = usuarios.find(user => user.Correo === Correo);
    if (usuarioExistente) {
        return res.status(400).json({ message: 'El correo ya existe' });
    }

    
    const nuevoUsuario = {
        Correo,
        Password
    };

    usuarios.push(nuevoUsuario);

    fs.writeFileSync(usuariosFile, JSON.stringify(usuarios, null, 2));

    return res.json({ message: 'Usuario creado exitosamente', usuario: nuevoUsuario });

});


function ObtenerUsuario() {
    const usuariosFile = path.join(process.cwd(), 'data', 'Usuario.json');
    const contenido = fs.readFileSync(usuariosFile, 'UTF-8');
    return JSON.parse(contenido);
}

export default router;
