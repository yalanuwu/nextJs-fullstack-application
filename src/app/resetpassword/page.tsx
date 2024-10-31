"use client"
import axios from "axios"
import { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import {EyeOffIcon, EyeIcon} from 'lucide-react';

export default function ResetPasswordPage() {

    const router = useRouter();

    const [error, setError] = useState("");
    const [verified, setVerified] = useState(false);
    const [userData, setUserData] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    const urlToken = window.location.search.split("=")[1];
    console.log(urlToken);

    //useEffect to verify the token
    useEffect(() => {
        const verifyToken = async () => {
            try {
                const res = axios.post('/api/users/resetpassword', {token : urlToken});

                if ((await res).status === 400){
                    setError("Invalid or expired token");
                    setVerified(true);
                } 

                if ((await res).status === 200){
                    setError("");
                    setVerified(true);
                    const userData = (await res).data;
                    setUserData(userData);
                }
            } catch (error : any) {
                console.log(error.message);
            }
        };

        verifyToken();
    }, [urlToken]);

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();

        try {
            const res = axios.post('/api/users/changepassword', {email : userData?.email, password : password});
            if ((await res).status === 200){
                setError("");
                router.push('/login');
            }
        } catch (error) {
            setError("Something went wrong");
            console.log(error);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Reset Your Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your new password below
            </p>
          </div>
          {verified ? (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm">
                <div className="relative">
                  <label htmlFor="password" className="sr-only">
                    New Password
                  </label>
                  <input
                    id="new-password"
                    name="New-Password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
  
              {error && (
                <p className="text-red-500 text-sm" role="alert">
                  {error}
                </p>
              )}
  
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update Password
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-8 text-center text-green-600" role="alert">
              <p>Your password has been successfully updated. You can now log in with your new password.</p>
            </div>
          )}
        </div>
      </div>
    
    )

}

