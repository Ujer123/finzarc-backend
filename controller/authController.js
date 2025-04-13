import User from "../model/userModel.js";
import bcrypt from "bcryptjs";

export const register = async (req, res)=>{
    const{name, email, password}= req.body;

    if(!name || !email || !password){
        return res.status(400).json({message: "Please fill all fields", success: false})
    }
    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists", success: false})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name, email, password: hashedPassword})
        await user.save();
        return res.status(201).json({message: "User created successfully", success: true})
    } catch (error) {
        res.status(500).json({message: "Internal server error", success: false})
    }
}

export const login = async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: "Please fill all fields", success: false})
    }
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User does not exist", success: false})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials", success: false})
        }
        return res.status(200).json({message: "Login successful", success: true})
    } catch (error) {
        res.status(500).json({message: "Internal server error", success: false})
    }
}

export const logout = async(req, res)=>{
    try {
        return res.status(200).json({message: "Logout successful", success: true})
    } catch (error) {
        return res.status(500).json({message: "Internal server error", success: false})
    }
}

export const getUser = async(req, res)=>{
    const {id} = req.params;
    try {
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message: "User not found", success: false})
        }
        return res.status(200).json({userData: {name: user.name}, success: true})
    } catch (error) {
        return res.status(500).json({message: "Internal server error", success: false})
    }
}