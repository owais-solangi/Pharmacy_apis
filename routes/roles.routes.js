
const controller = require('../controllers/role.controller');

module.exports = function(app){
    app.use(function (req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next();
    })

    app.get("/api/v1/roles", controller.getRoles);
    app.get("/api/v1/roles/:id", controller.getRolebyId);
    app.post("/api/v1/roles", controller.Create_roles);
    app.delete("/api/v1/roles/:id" , controller.DeleteRoles);
}

