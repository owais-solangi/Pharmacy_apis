

const Controller = require('../controllers/product.controller');
const verifyToken = require("../middlewares/verifytoken");

module.exports = function (app) {
    
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/v1/products/",verifyToken,Controller.getProducts);
   app.get("/api/v1/product/:id", verifyToken,Controller.getProductById);
   app.post("/api/v1/product/",verifyToken,Controller.createProduct);
   app.put("/api/v1/product/:id",verifyToken,Controller.Updateproduct);
   app.delete("/api/v1/product/:id",verifyToken,Controller.Deleteproduct);
}


