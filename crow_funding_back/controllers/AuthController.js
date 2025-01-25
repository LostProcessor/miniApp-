import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import validator from "validator"
import userModel from "../mongodb/Models/userModel.js"
import express from 'express'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

const createToken = (_id) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    return jwt.sign({ _id }, jwtSecretKey, { expiresIn: "3d" });
};


const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password)
            return res.status(400).json("All fields are required...");

        if (!validator.isEmail(email))
            return res.status(400).json("Email must be a valid email...");

        let user = await userModel.findOne({ email:email });

        if (user) return res.status(400).json("User already exists...");
        user = new userModel({ name, email, password }) 

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = createToken(user._id);
        
        res.status(201).json({ _id: user._id, name, email, token });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await userModel.findOne({ email });

        if (!user) return res.status(400).json("Invalid email or password...");

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
            return res.status(400).json("Invalid email or password...");

        const token = createToken(user._id);

        res.status(200).json({ _id: user._id, name: user.name, email, token });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};


const findUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await userModel.findById(userId);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};


function generateVerificationCode() {
    return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit code
}
const  sendVerificationEmail = async (email, code) =>  {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,  // Set to true if using port 465
        auth: {
            user: 'bilbo763@gmail.com', // Your mail.com email
            pass: process.env.NODE_MAILER_PASSWORD ,  // Your mail.com password
        },
        authMethod: 'LOGIN',
        logger: true,  // Enable logging
        debug: true    // Enable debugging;
    });


    const mailOptions = { 
        to: email,
        subject: 'Your Verification Code',
        text: `Your verification code is: ${code}`
    };

    await transporter.sendMail(mailOptions);
}


const sendVerification = async (req, res) => {
    try {
        const code = generateVerificationCode();
        const codeExpiry = new Date(Date.now() + 15 * 60 * 1000); // Code valid for 15 minutes
        const email = req.body.email
        const user = await userModel.findOneAndUpdate(
            { email },
            { verificationCode: code, codeExpiresAt: codeExpiry },
            { upsert: true, new: true } // Create a new user if not found
        );
        await sendVerificationEmail(email, code);

        console.log(`Verification code sent to ${email}`);
        return res.status(200).json(user)
    }catch(e){
        console.log(e)
        return  res.status(500).json(e)
    }
  
   
}

const  verifyCode  = async (req,res)=> {

    const {email,enteredCode} = req.body
    console.log('verify code ')
    console.log(email)
    console.log(enteredCode)
    const user = await userModel.findOne({ email });

    console.log(JSON.stringify(user))
    if (!user) {
        console.log('one')
        return res.status(400).json({error:'No user',success:false})
    }
 
    if (!user.verificationCode || !user.codeExpiresAt) {
        console.log(!user.verificationCode)
        console.log(!user.codeExpiresAt)
        console.log('two')
        return res.status(400).json({error:'no code',succes:false})
    }

    if (user.codeExpiresAt < Date.now()) {
        console.log('three')
        return  res.status(400).json({error:'you took to much time please refresh the page and try again',success:false})
    }

    if (user.verificationCode !== enteredCode) {
        console.log('four')
        return res.status(400).json({error:'your code is invaliad try again',success:false})
   
    }

    // Mark the user as verified
    user.isVerified = true;
    user.verificationCode = null; // Clear the code
    user.codeExpiresAt = null;
    await user.save();

    console.log(`User ${email} verified successfully.`);
    return res.status(200).json({error:false,success:true})
}


export { getUsers, findUser, login, register, verifyCode, sendVerification }
