import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import crypto from 'crypto';


connectDB();

//api to verify forget password token
export async function POST(request : NextRequest){
    const {token } = await request.json();
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
        forgetPasswordToken : hashedToken,
        forgetPasswordTokenExpiry : { $gt : Date.now()}
    })

    if (!user) return NextResponse.json({error : 'Invalid or expired Token'}, {status : 400});

    return new NextResponse(JSON.stringify(user), {status : 200});
}
