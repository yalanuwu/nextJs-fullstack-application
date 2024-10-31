import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import brcypt from 'bcryptjs';


connectDB();

//api to change the password
export async function POST(request : NextRequest){
    const {password, email } = await request.json();
    
    const hashedPassword = await brcypt.hash(password, 10);

    const user = await User.findOne({
        email : email
    });

    if (!user) return NextResponse.json({error : 'User not found'}, {status : 400});

    user.password = hashedPassword;
    user.forgetPasswordToken = undefined;
    user.forgetPasswordTokenExpiry = undefined;

    try {
        await user.save();
        return NextResponse.json({message : 'Password changed successfully', success : true}, {status : 200})
    } catch (error : any) {
        return NextResponse.json({ error: error.message }), { status: 401 }
    }
}
