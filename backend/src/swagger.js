import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Gemini API",
            version: "1.0.0",
            description: "API permettant d'interroger Gemini via Google GenAI"
        },
        servers: [
            {url: "http://localhost:3000"}
        ]
    },
    apis: [path.join(process.cwd(), "backend/src/**/*.js")]
});