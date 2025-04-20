const Post = require('../models/postmodel')


module.exports.getAllPosts = async (req, res) => {
    try{
      const posts = await Post.find()

      res.status(200).send(posts)
    }
    catch(err){
        console.error(err);
        res.status(500).send(err)
    }
}

module.exports.getOnePost = async(req,res) => {
    try{
       const posts = await Post.findOne({
        _id:req.params.id
       })

       res.status(200).send(posts)
    }
    catch(err){
        console.log(err,"errr")
        res.status(500).send(err)
    }
}

module.exports.addOnePost = async(req,res) => {
    try{
        const post = new Post({
            title:req.body.title,
            body:req.body.body
        })

        await post.save()
        res.status(201).send(post)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports.updateOnePost = async (req, res) => {
    try {
        const post = await Post.findOneAndUpdate(
            { _id: req.params.id },
            {
                title: req.body.title,
                body: req.body.body
            },
            { new: true }
        );
        res.status(200).send(post);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports.deleteOnePost = async (req,res) => {
    try{
        const post = await Post.findOneAndDelete({
            _id:req.params.id
        })

        res.status(200).send(post)
    }
    catch(err){
        res.status(err).send(err)
    }
}