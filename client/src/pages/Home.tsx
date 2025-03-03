import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface PostsType {
    id:number;
    title:string;
    content:string;
    createAt:string
  }

export default function Home() {
    const [posts,setposts] = useState<PostsType[]>([]);

    useEffect(() => {
        const abortcontroller:AbortController = new AbortController();

        const loaddata = async () => {
            const response = await axios.get(import.meta.env.VITE_URL);
            if (response.status === 200) {
                setposts(response.data);
            }
        }

        loaddata();

        return () => abortcontroller.abort();
    },[]);

    return(
        <div className="p-[20px]">
            <h1 className="text-[40px] font-bold">My Post</h1>
            <table className="w-[100%] mt-[30px]">
                <thead>
                    <tr>
                        <th className="w-[33%]">Post Name</th>
                        <th className="w-[33%]">Option</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((e:PostsType,i:number) => (
                        <tr key={i}>
                            <td className="text-center p-[10px]"><Link to={`/viewpost/${e.id}`} className="text-[#4e8cf1] font-bold underline">{e.title}</Link></td>
                            <td className="text-center p-[10px]">
                                <Link to={""} className="mr-[10px] text-[#d0ca0b]">Edit</Link>
                                <Link to={""} className="mr-[10px] text-[#ff0033]">Delete</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={"/createpost"} className="bg-[#4e8cf1] text-[#fff] inline-block p-[10px_1.5rem] font-bold rounded-[8px] mt-[50px]">Create Post</Link>
        </div>
    );
}