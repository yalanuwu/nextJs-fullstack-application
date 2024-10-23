"use client";
import Link from "next/link";
import { useEffect, useState} from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email:"",
        password:"",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log(response);
            toast.success("Login Success");
            router.push('/profile');

        } catch (error : any) {
            console.log("Login Failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>
            <hr />
            
            <label htmlFor="email">email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-black"
            id="email" name="email" type="text" value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})} 
            placeholder="Enter your email"/>

            <label htmlFor="password">password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500 text-black"
            id="password" name="password" type="password" value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})} 
            placeholder="Enter your password"/>

            <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500" 
            type="submit"
            onClick={onLogin}>
                Login
            </button>

            <Link href="/signup">Visit Signup page</Link>
            
        </div>
    );
}