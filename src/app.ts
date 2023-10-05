import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { connect } from "mongoose";
import homeRoutes from "./routes/home";

const DB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/api", homeRoutes);

app.get("/check", (_req: Request, res: Response) => {
    res.status(200).json({ status: "working" });
});

app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(error);
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message;
    const errorData = error.data;
    return res.status(statusCode).json({
        status: "Failed",
        error: errorMessage,
        data: errorData,
    });
});

async function connectMongoDB() {
    try {
        const connection = await connect(DB_URI);
        console.log(
            `Connection established with DB : ${connection.connection.name}`
        );
    } catch (err) {
        console.log(`Cannot connect to DB: ${err.message}`);
        process.exit(1);
    }
}

async function main() {
    try {
        await connectMongoDB();
        app.listen(PORT, () => {
            console.log(`Server started at port: ${PORT}`);
        });
    } catch (err) {
        console.error(`Error Occurred: ${err}`);
    }
}

main();
