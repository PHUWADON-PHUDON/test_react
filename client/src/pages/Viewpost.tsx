import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Viewpost() {
    const [post,setpost] = useState<string>("");
    const param = useParams();

    useEffect(() => {
        const abortcontroller:AbortController = new AbortController();

        const loaddata = async () => {
            const response = await axios.get(import.meta.env.VITE_URL + "getpost/" + param.id);
            if (response.status === 200) {
                setpost(response.data.content)
            }
        }

        loaddata();

        return () => abortcontroller.abort();
    },[]);

    return(
        <div className="p-[20px]">
            <div className="contentview" dangerouslySetInnerHTML={{ __html:post }} />
        </div>
    );
}