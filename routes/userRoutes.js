const express = require('express');

const router = express.Router();

const {Signup,Login,getusers} = require("../controllers/userController");
const authmiddleware = require('../middleware/authmiddlewre');

router.get("/",authmiddleware,getusers)
router.post("/signup",Signup)
router.post("/login",Login)


module.exports.UserRoutes = router