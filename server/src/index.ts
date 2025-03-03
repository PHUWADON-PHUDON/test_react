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
app.use(cors({origin: ["http://localhost:5173"],methods:["PUT,DELETE,OPTIONS"],credentials: true}));

app.get("/", async (req:Request,res:Response) => {
    const posts = await prisma.post.findMany();
    res.json(posts);
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});