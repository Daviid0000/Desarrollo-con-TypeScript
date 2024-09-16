import userService from "../services/user.service.js"
import jwt from "jsonwebtoken";
import { secretKey } from "../config/environments.js";

export const viewUsers = async (req, res) => {
    try {
        const users = await userService.findUsers();

        if(!users) {
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Error: Usuarios no encontrados"
            });
        };

        return res.json({users});
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message})
    };
}

export const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log("datos:", username, email, password)
    try {
        if(!username || !password) {
            return res.status(400).json({ message: "Usuario o contraseña faltante" })
        }

        if(!email) {
            return res.status(400).json({ message: "Email faltante" })
        }
        
        const userExists = await userService.findEmail(username);
        console.log(userExists)
        console.log("Usuario:", userExists)

        if(userExists) {
            throw({
                statusCode: 400,
                message: "El usuario ya existe"
            })
        }

        const userCreated = await userService.createUsers({username, email, password});
        
        if(!userCreated) {
            throw({
                statusCode: 400,
                message: "Error: No se creo el usuario"
            });
        };
        
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h'});
        return res.status(201).json({ message: "Usuario creado", userCreated, token})
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message})
    }
}

export const viewOneUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.getOneUser(id)

        if(!user){
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Usuario no encontrado"
            })
        }

        res.json(user)
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message })
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
        const userUpdated = await userService.updateUser(id, { username, email, password });
        const user = await userService.getOneUser(id);

        if(!userUpdated){
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Usuario no actualizado"
            });
        };

        res.json({ message: "Usuario actualizado", user})
    } catch (error) {
        res.stats(500).json({ message: "Error en el servidor", error: error.message})
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const userDeleted = await userService.deleteUser({id});

        if(!userDeleted) {
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Error: Usuario no eliminado"
            });
        };

        res.json({ message: "Usuario eliminado", userDeleted })
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message })
    }
}

export const authLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password)
        if(!username || !password) {
            return res.status(400).json({ message: "Usuario o contraseña faltante" })
        }
        const users = await userService.findUsers();

        const user = users.find(u => u.username === username && u.password === password)
        if(!user) {
            return res.status(400).json({ message: "Usuario o contraseña incorrecta" })
        }
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

        res.json({message:"Uuh te has logueado, toma tu token:", token });
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message })
    }
}