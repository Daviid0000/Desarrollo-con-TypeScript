import express, { Application } from 'express';
import cors from 'cors';
import routerProduct from '../router/products.routes.js';
import userRoutes from '../router/users.routes.js';
import authUser from '../router/auth.user.routes.js';
import sequelize from '../config/databaseConection.js';
import { PORT } from '../config/environments.js';
import './product.model.js';
import 'dotenv/config'

class Server {
    public app: Application;
    private port: string | number;

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
        this.app.use("/api",  routerProduct);
        this.app.use("/",  userRoutes);
        this.app.use("/auth",  authUser);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en http://localhost:${this.port}`)
        })
    }
}

export default Server