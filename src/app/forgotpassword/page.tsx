"use client"
import axios from "axios"
import { useState } from "react"


export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        
        try {
            const res = await axios.post('/api/users/forgotpassword', {email});
            console.log(res);
        } catch (error : any) {
            console.log(error.response.data)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Forgot your password?
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Enter your email address and we will send you a link to reset your password.
              </p>
            </div>
            {!success ? (
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
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
                    Reset Password
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-8 text-center text-green-600" role="alert">
                <p>If an account exists for {email}, you will receive a password reset link shortly.</p>
              </div>
            )}
          </div>
        </div>
      )
}