const User = require("../models/userModel");

const bcrypt = require('bcryptjs');


module.exports.getusers = async(req,res) =>{
    try{
      const users = await User.find();
      if(!users){
        return res.status(404).json({message: "No users found"});
      }
      return res.status(200).json({message: "Users fetched successfully", users});
    }
    catch(err){
      res.status(500).json({message: "Internal Server Error"});
    }
  }

module.exports.Signup = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message: "Please fill all the fields"});
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        if(!hashedPassword){
            return res.status(500).json({message: "Internal Server Error"});
        }
        const newUser = await User.create({
            name,
            email,
            password:hashedPassword 
        });
        return res.status(201).json({message: "User created successfully", user: newUser});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports.Login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Please fill all the fields"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User does not exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }
        req.session.user = user;
        return res.status(200).json({message: "Login successful", user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}


