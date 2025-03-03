import { useState } from "react";
import axios from "axios";
import Tiptap from "../components/Tiptap";

interface ImageFileType {
    file:File;
    blob:string;
}

export default function Createpost() {
    const [inputtitle,setinputtitle] = useState<string>("");
    const [inputfile,setinputfile] = useState<ImageFileType[]>([]);
    const [content,setcontent] = useState<string>("<p>สวัสดี! เริ่มเขียนได้เลย</p>");
    const [waitcreate,setwaitcreate] = useState<boolean>(false);
    const [isload,setisload] = useState<boolean>(false);

    //!create post

    const createPost = async () => {
        const abortcontroller:AbortController = new AbortController();

        if (inputtitle !== "" && content !== "") {
            try{
                const newinputfile:ImageFileType[] = inputfile.filter((e:ImageFileType) => {
                    if (content.includes(e.blob)) {
                        return(e);
                    }
                });

                const formdata:FormData = new FormData();
                formdata.append("inputtitle",inputtitle);
                formdata.append("content",content);
                newinputfile.forEach((file:ImageFileType) => {
                    formdata.append("images",file.file);
                    formdata.append("blobs",file.blob);
                });

                setwaitcreate(true);

                const response = await axios.post("/api/upload",formdata,{headers:{'content-type':'multipart/form-data'},signal:abortcontroller.signal});
                if (response.status === 200) {

                }
            }
            catch(err) {
                console.log(err);
            }
        }

        return () => abortcontroller.abort();
    };

    //!

    return(
        <div className="m-[20px]">
            <h1 className="text-[40px] font-bold">Create Post</h1>
            <h2 className="mt-[20px] font-bold">Input Title:</h2>
            <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => setinputtitle(e.target.value)} type="text" className="border mt-[10px] pl-[10px] focus:outline-none"/>
            <Tiptap content={content} setcontent={setcontent} setinputfile={setinputfile} setisload={setisload}/>
            {waitcreate ? 
                <p className="p-[10px_1.5rem] mt-[30px]">Create...</p>
                :
                (isload ? <button onClick={() => createPost()} className="bg-[#4e8cf1] text-[#fff] inline-block p-[10px_1.5rem] font-bold rounded-[8px] mt-[30px]">Create Post</button>:"")
            }
        </div>
    );
}