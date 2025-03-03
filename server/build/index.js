"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const { PrismaClient } = require("@prisma/client");
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const prisma = new PrismaClient();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(cors({ origin: [process.env.URL_FRONT], methods: ["PUT,DELETE,OPTIONS"], credentials: true }));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma.post.findMany();
        res.json(posts);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
app.get("/getpost/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield prisma.post.findUnique({
            where: { id: Number(req.params.id) },
            include: { images: true }
        });
        res.json(post);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
