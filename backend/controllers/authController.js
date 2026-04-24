import user from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signUpUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const existingUser = await user.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({name, email, password: hashedPassword});
        await newUser.save();
        res.status(201).json({message: "User created successfully"});
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
};

export const logInUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const existingUser = await user.findOne({email});
        if (!existingUser) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        //check password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        // Generate JWT token
        const token = jwt.sign({userId: existingUser._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.status(200).json({message: "Login successful", token, user: {name: existingUser.name, email: existingUser.email}});
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};