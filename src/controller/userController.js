import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import {User} from '../model/userModel.js'

//@access public
export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    if (!username || !email || !password) {
        res.status(400).json({ message: "Please fill all fields" });
        return;
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({ message: "User already exists" });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password",hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log("User created",user);

    if (!user) {
        res.status(400).json({ message: "Invalid user data" });
        return;
    }

    res.status(201).json({ message: "User Registered" });
});

//@access public
export const loginUser = asyncHandler(async (req,res)=>{
    res.json({message: "User logged in"});
});


//@access private
export const currentUser = asyncHandler(async (req,res)=>{
    res.json({message: "Current"})
})

