const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { GoogleGenAI } = require("@google/genai");

const auth = require("./modules/authentication");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: "AIzaSyDLyllsbwD5xp5EZNUAuBeGlxVGHRQIaI4"
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
    const { secret } = req.params;
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
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt requis" });
        }

        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt
        });

        res.json({ response: result.text });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Erreur inconnue";
        res.status(500).json({ error: message });
    }
});

/* Swagger */
const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Gemini API",
            version: "1.0.0",
            description: "API permettant d'interroger Gemini via Google GenAI"
        },
        servers: [
            { url: "http://localhost:3000" }
        ]
    },
    apis: ["./src/**/*.js"]
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
