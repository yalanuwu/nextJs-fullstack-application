import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

export const sendEmail = async({email, emailType, userId} : any) => {
    try {
        const hashToken = await bcryptjs.hash(userId.toString(), 10);
        const resetToken = crypto.randomBytes(20).toString('hex')
        const forgetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        if (emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken : hashToken,
                    verifyTokenExpiry : Date.now() + 3600000
                });
        } 
        else if(emailType === "RESET_PASSWORD"){
            await User.findByIdAndUpdate(userId,
                {
                    forgetPasswordToken :  forgetPasswordToken,
                    forgetPasswordTokenExpiry : Date.now() + 36000000
                }
            );
        }

        
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_AUTH_USER,
                pass: process.env.MAILTRAP_AUTH_PASSWORD
            }
        });

        const mailOptions = {
            from : 'testmail@gmail.com',
            to : email,
            subject : emailType === "VERIFY" ? `Verify your account` : `Reset your Password`,
            html : emailType === "VERIFY" ? `<p>Copy this link below to verify your mail<br>${process.env.DOMAIN}/verifyemail?token=${hashToken}</p>` : `<p>Copy this link below to reset your password.<br>${process.env.DOMAIN}/resetpassword?token=${resetToken}</p>`
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
        

        
    } catch (error : any) {
        throw new Error(error.message);
    }
}
