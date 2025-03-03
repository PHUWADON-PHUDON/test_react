require("dotenv").config();
import express, { Request, Response } from "express";
const app = express();
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const { PrismaClient } = require("@prisma/client");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const prisma = new PrismaClient();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors({origin:[process.env.URL_FRONT],methods:["PUT,DELETE,OPTIONS"],credentials: true}));

app.get("/", async (req:Request,res:Response) => {
    try{
        const posts = await prisma.post.findMany();
        res.json(posts);
    }
    catch(err) {
        res.status(500).send(err);
    }
});

app.get("/getpost/:id", async (req:Request,res:Response) => {
    try{
        const post = await prisma.post.findUnique({
            where:{id:Number(req.params.id)},
            include:{images:true}
        });
        res.json(post);
    }
    catch(err) {
        res.status(500).send(err);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});