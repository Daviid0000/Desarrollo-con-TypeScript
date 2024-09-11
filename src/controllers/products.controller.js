import productService from "../services/product.service.js"

export const getProducts = async (req, res) => {
    try {
        const products = await productService.findAllProducts();

        if(!products) {
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontraron productos"
            })
        }

        res.json(products)
    } catch (error) {
        res.status(500).json({message: "Error en el servidor", error: error.message})
    }
}

export const createProduct = async (req, res) => {
    const { name } = req.body;
    try {
        const createdProduct = await productService.createProduct({name})
        
        if(!createdProduct){
            throw({
                statusCode: 400,
                message: "Error al crear el producto"
            })
        }
        res.status(201).json(createdProduct)
    } catch (error) {
        res.status(500).json({message: "Error en el servidor", error: error.message})
    }
}

export const getOneProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productService.findByIDProduct(id)

        if(!product){
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Producto no encontrado"
            })
        }

        res.json(product)
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message })
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const productUpdated = await productService.updateProduct(id, { name });
        const product = await productService.findByIDProduct(id);

        if(!productUpdated){
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Producto no actualizado"
            });
        };

        res.json({ message: "Producto actualizado", product})
    } catch (error) {
        res.stats(500).json({ message: "Error en el servidor", error: error.message})
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const productDeleted = await productService.deleteProduct({id});

        if(!productDeleted) {
            throw({
                statusCode: 404,
                status: "Not Found",
                message: "Error: No se eliminó el producto"
            });
        };

        res.json({ message: "Producto eliminado", productDeleted })
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message })
    }
}