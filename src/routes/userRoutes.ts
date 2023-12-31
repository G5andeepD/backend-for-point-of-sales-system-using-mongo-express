import express from 'express'
import { currentUser, loginUser, registerUser } from '../controller/userController'

export const router = express.Router()

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/current",currentUser);

