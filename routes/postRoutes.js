const express = require('express')

const router = express.Router()

const {getAllPosts,updateOnePost,addOnePost,deleteOnePost} = require("../controllers/postController")

router.get("/",getAllPosts)

router.post("/add",addOnePost)

router.patch("/:id",updateOnePost)

router.delete("/:id",deleteOnePost)


module.exports.PostRoutes = router