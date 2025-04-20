const express = require('express')

const allRoutes = express.Router()

const {PostRoutes} = require("./postRoutes")

const {UserRoutes} = require("./userRoutes")
const authmiddleware = require('../middleware/authmiddlewre')


allRoutes.use("/posts",authmiddleware,PostRoutes)
allRoutes.use("/users",UserRoutes)

module.exports = allRoutes
