import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { User, UserDocument } from '../model/userModel'; // Assuming you have a UserDocument type for your Mongoose model

//@access public
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body as { username: string; email: string; password: string };
    console.log(req.body);

    if (!username || !email || !password) {
        res.status(400).json({ message: 'Please fill all fields' });
        return;
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password', hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    } as UserDocument);

    console.log('User created', user);

    if (!user) {
        res.status(400).json({ message: 'Invalid user data' });
        return;
    }

    res.status(201).json({ message: 'User Registered' });
});

//@access public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    res.json({ message: 'User logged in' });
});

//@access private
export const currentUser = asyncHandler(async (req: Request, res: Response) => {
    res.json({ message: 'Current' });
});
