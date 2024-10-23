import {connectDB} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

connectDB();

export async function POST(request : NextRequest){
    try {
        const requestBody = await request.json();
        const {email, password} = requestBody;
        console.log(requestBody);

        //check for user existence
        const user = await User.findOne({email});
        if (!user){
            return NextResponse.json({ error : 'User not found' }, { status : 404 });
        }

        //check for password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword){
            return NextResponse.json({ error : 'Invalid password' }, { status : 401 });
        }

        //token generation 
        const tokenData = {
            id : user._id,
            userName : user.userName,
            email : user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn : "1d"});

        const response = NextResponse.json({message : "Login Successful", success : true});

        response.cookies.set("token", token, {
            httpOnly : true
        });
        
        return response;
        
    } catch (error : any) {
        return NextResponse.json({ error : error.message }, {status : 500});
    }
}