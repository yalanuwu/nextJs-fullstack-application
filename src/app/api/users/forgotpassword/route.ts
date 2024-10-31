import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDB();

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json();
        const {email} = reqBody;
        console.log(email);

        const user = await User.findOne({email : email})

        if(!user) return NextResponse.json({ error : "User not found" }, {status : 400});
        console.log(user);


        await sendEmail({email, emailType : "RESET_PASSWORD", userId : user._id});

        return NextResponse.json({ message : "Email sent successfully", success : true}, {status : 200});

        
    } catch (error : any) {
        return NextResponse.json({ error : error.message }, {status : 500});
    }
}