

const Controller = require("../controllers/Purchase.controller");
// const upload = require('../utils/productUploads';
const verifyToken = require("../middlewares/verifytoken")
module.exports = function (app) {
    
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/v1/purchase/",verifyToken,Controller.getAllPurchases);
    app.post("/api/v1/purchase/",verifyToken,Controller.createPurchase);
    app.put("/api/v1/purchase/:id",verifyToken,Controller.updatePurchase);
    app.delete("/api/v1/purchase/:id",verifyToken,Controller.deletePurchase);
}


