import {connectDB} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'



connectDB();

export async function POST(request : NextRequest){
    try {
        const requestBody = await request.json();
        const {userName, email, password} = requestBody;

        console.log(requestBody);

        const user = await User.findOne({email});
        if (user) {
            return NextResponse.json({error : 'User already exists'}, {status : 400})
        }

        //password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName,
            email,
            password : hashedPassword
        })
        await newUser.save();

        return NextResponse.json({
            message : 'User created successfully',
            success : true,
        })

    } catch (error : any) {
        return NextResponse.json({error : error.message}, {status : 500})
    }
}