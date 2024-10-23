"use client";
import Link from "next/link";
import { useEffect, useState} from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpPage() {

    const router = useRouter();

    const [buttonDisabled, setButtonDisabled] = useState(false)

    const [user, setUser] = useState({
        email:"",
        password:"",
        userName:""
    })

    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log(response.data);
            router.push('/login');
            

        } catch (error : any) {
            console.log(error);
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.userName.length > 0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Sign Up</h1>
            <hr />
            <label htmlFor="userName">userName</label>
            <input className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500"
            id="userName" name="userName" type="text" value={user.userName}
            onChange={(e) => setUser({...user, userName: e.target.value})} 
            placeholder="Enter your User Name"/>
            
            <label htmlFor="email">email</label>
            <input className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500"
            id="email" name="email" type="text" value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})} 
            placeholder="Enter your email"/>

            <label htmlFor="password">password</label>
            <input className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500"
            id="password" name="password" type="password" value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})} 
            placeholder="Enter your password"/>

            <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500" 
            type="submit"
            onClick={onSignup}
            disabled={buttonDisabled}>
                Sign Up
            </button>

            <Link href="/login">Visit login page</Link>
            
        </div>
    );
}

