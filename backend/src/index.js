import express from "express";
import {GoogleGenAI} from "@google/genai";
import cors from "cors";
import dotenv from "dotenv";

import auth from "./modules/authentication.js";
import swaggerUi from "swagger-ui-express";
import {swaggerSpec} from "./swagger.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check
 *     responses:
 *       200:
 *         description: OK
 */
app.get("/", (req, res) => {
    res.send("Hello World!");
});

/**
 * @swagger
 * /auth/{secret}:
 *   get:
 *     summary: Authentication endpoint
 *     parameters:
 *       - in: path
 *         name: secret
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Auth result
 */
app.get("/auth/:secret", (req, res) => {
    const {secret} = req.params;
    const response = auth(secret);

    res.status(response.status).send(response.message);
});

/**
 * @swagger
 * /generate:
 *   post:
 *     summary: Generate text with Gemini
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *     responses:
 *       200:
 *         description: Generated content
 */
app.post("/generate", async (req, res) => {
    try {
        const {prompt} = req.body;

        if (!prompt) {
            return res.status(400).json({error: "Prompt requis"});
        }

        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt
        });

        res.json({response: result.text});
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Erreur inconnue";
        res.status(500).json({error: message});
    }
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
