const { authenticate } = require("../config/jwt.config");
const userController =require("../controllers/userController");

module.exports = app => {
    app.post("/api/register", userController.registerUser);
    app.post("/api/login", userController.loginUser);
    app.post("/api/logout", userController.logout);
    app.get("/api/users/:id",authenticate,userController.getUserById);
    app.get("/api/user/:id/events",authenticate,userController.getUserEvents)
    app.patch("/api/updateuser/:id",authenticate, userController.updateUser);

};

