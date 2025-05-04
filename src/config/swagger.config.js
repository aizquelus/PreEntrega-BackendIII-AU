import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "Adoption Pets API Documentation",
            version: "1.0.0",
            description: "Documentation for the Adoption Pets API",
        },
    },
    apis: ["./src/docs/**/*.yaml"],
};

export const specs = swaggerJsDoc(swaggerOptions);
