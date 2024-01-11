// const validateSalesOrder = require("../middlewares/Validation");


const Controller = require("../controllers/SalesOrder.controller");
const verifyToken = require("../middlewares/verifytoken");

module.exports = function (app) {
    
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/v1/sales-order/",verifyToken,Controller.getSalesorder);
    app.post("/api/v1/sales-order/", verifyToken,Controller.SalesOrders);
    app.put("/api/v1/sales-order/:id",verifyToken,Controller.UpdateSaleOrder);
    app.delete("/api/v1/sales-order/:id",verifyToken,Controller.DeletesalesOrder);

}



