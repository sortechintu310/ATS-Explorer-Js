import express, { json } from "express";
import parser from "@babel/parser";
import cors from "cors"

const app = express();

app.use(json());

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));


app.listen(3000, () => {
    console.log("Listening on 3000....");
});

app.post("/explorer", (req, res) => {
    try {
        const { code } = req.body;
        console.log("Received code:", code);

        const ast = parser.parse(code, {
            sourceType: "module",
            plugins: ["jsx", "typescript"],
        });

        return res.status(200).json(ast);
    } catch (err) {
        console.error("Parse error:", err.message);
        return res.status(400).json({ error: err.message });
    }
});