"use client"
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import { useState } from "react";


export default function ProfilePage() {
    const router = useRouter();

    const [data, setData] = useState("noData");

    const logout = async () => {
      try {
        await axios.get('/api/users/logout');
        toast.success("Logout successful");
        router.push('/login');

      } catch (error : any) {
        console.log(error.message);
        toast.error(error.message);
      }
    };

    const getUserDetails = async () => {
      const result = await axios.get('/api/users/me');
      console.log(result.data);
      setData(result.data.data._id);
      
    }

    return (
        <div>
            <h1>Profile Page</h1>
            <p>This is the profile page.</p>
            <h2>{data === 'noData' ? "No data found" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
            <hr />
            <button
                onClick={logout}
                className="bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
            <button
                onClick={getUserDetails}
                className="bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded"
            >
                get user details
            </button>
        </div>
    );
}
