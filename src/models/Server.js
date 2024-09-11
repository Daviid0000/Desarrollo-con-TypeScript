import express from 'express';
import cors from 'cors';
import routerProduct from '../router/products.routes.js';
import sequelize from '../config/databaseConection.js';
import { PORT } from '../config/environments.js';
import './product.model.js';
import 'dotenv/config'

class Server {
    constructor() {
        this.app  = express();
        this.port = PORT;

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            await sequelize.authenticate();
            return console.log("Base de datos conectada")  
        } catch (error) {
            return console.log("Error al conectar la base de datos")
        }
    }
    
    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes() {
        this.app.use("/api",  routerProduct)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en http://localhost:${this.port}`)
        })
    }
}

export default Server