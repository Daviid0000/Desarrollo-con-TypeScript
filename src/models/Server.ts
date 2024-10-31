import express, { Application } from 'express';
import cors from 'cors';
import routerProduct from '../router/products.routes.js';
import userRoutes from '../router/users.routes.js';
import authUser from '../router/auth.user.routes.js';
import sequelize from '../config/databaseConection.js';
import { PORT } from '../config/environments.js';
import './product.model.js';
import 'dotenv/config'

// import productService from '../services/product.service.js';
import { ProductAuditLogger } from '../Observers/ProductAuditLogger.js';
import { ProductNotifier } from '../Observers/productNotifier.js';
import ProductService from '../services/product.service.js';

class Server {
    public app: Application;
    private port: string | number;

    constructor() {
        this.app  = express();
        this.port = PORT;

        const productNotifier = new ProductNotifier();
        const productAuditLogger = new ProductAuditLogger();
        ProductService.addObserver(productNotifier);
        ProductService.addObserver(productAuditLogger);
        
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