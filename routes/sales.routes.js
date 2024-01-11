


const Controller = require("../controllers/sales.controller");
const verifyToken = require("../middlewares/verifytoken");

module.exports = function (app) {
    
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/v1/sales/",verifyToken,Controller.getAllSales);
    app.post("/api/v1/sales/",verifyToken,Controller.createSale);
    app.put("/api/v1/sales/:id",verifyToken,Controller.updateSale);
    app.delete("/api/v1/sales/:id",verifyToken,Controller.deleteSale);
}



