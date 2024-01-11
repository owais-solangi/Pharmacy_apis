
const Controller = require('../controllers/user.controller');
const upload = require("../utils/fileUploads");
const verifyToken = require("../middlewares/verifytoken");



module.exports = function (app) {
    
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.get("/api/v1/users",verifyToken,Controller.getUsers);
    app.get("/api/v1/users/:id", verifyToken ,Controller.getUserById);
    app.post("/api/v1/users",[upload.single('image')],Controller.CreateUser);
    app.put("/api/v1/users/:id",verifyToken,Controller.UpdateUser);
    app.delete("/api/v1/users/:id",Controller.deleteUser);
    
    

}

