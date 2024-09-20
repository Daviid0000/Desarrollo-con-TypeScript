var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import cors from 'cors';
import routerProduct from '../router/products.routes';
import userRoutes from '../router/users.routes';
import authUser from '../router/auth.user.routes';
import sequelize from '../config/databaseConection';
import { PORT } from '../config/environments';
import './product.model.js';
import 'dotenv/config';
class Server {
    constructor() {
        this.app = express();
        this.port = PORT;
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sequelize.authenticate();
                return console.log("Base de datos conectada");
            }
            catch (error) {
                return console.log("Error al conectar la base de datos");
            }
        });
    }
    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }
    routes() {
        this.app.use("/api", routerProduct);
        this.app.use("/", userRoutes);
        this.app.use("/auth", authUser);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en http://localhost:${this.port}`);
        });
    }
}
export default Server;
//# sourceMappingURL=Server.js.map