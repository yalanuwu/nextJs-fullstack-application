import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId} : any) => {
    try {
        const hashToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken : hashToken,
                    verifyTokenExpiry : Date.now() + 3600000
                });
        } else if(emailType === "RESET_PASSWORD"){
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken :  hashToken,
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
            html : `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> to
            ${emailType === "VERIFY" ? 'Verify your email' : 'Reset your Password'} or use the link below. 
            <br>${process.env.DOMAIN}/verifyemail?token=${hashToken}</p>`
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
        

        
    } catch (error : any) {
        throw new Error(error.message);
    }
}
