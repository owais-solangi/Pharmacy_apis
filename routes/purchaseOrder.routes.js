

const Controller = require("../controllers/PurchaseOrder.controller");
const upload = require('../utils/productUploads');
const verifyToken = require("../middlewares/verifytoken");

module.exports = function (app) {
    
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/v1/purchase-order/:id", verifyToken,Controller.getPurchaseOrderById);
    app.get("/api/v1/purchase-order/", verifyToken,Controller.getPurchaseOrder);
    app.post("/api/v1/purchase-order/",upload.single('image'),Controller.createPurchaseOrder);
    app.put("/api/v1/purchase-order/:id",verifyToken,Controller.updatePurchaseOrder);
    app.delete("/api/v1/purchase-order/:id",verifyToken,Controller.deletePurchaseOrder);

}

