import userService from "../services/user.service.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
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

        const hashPass = await bcrypt.genSalt(10);
        userCreated.password = await bcrypt.hash(password, hashPass) 
        
        const newUser = await userCreated.save();

        return res.status(201).json({ message: "Usuario creado", newUser, token})
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
        const users = await userService.findUser(username);

        const authPass = bcrypt.compareSync(password, users.password);

        if(!authPass) {
            throw({
                statusCode: 400,
                message: "La contraseña no es valida"
            })
        }

        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

        res.json({message:"Uuh te has logueado, toma tu token:", token });
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor", error: error.message })
    }
}