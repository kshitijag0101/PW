import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function isAuth(req: Request, _res: Response, next: NextFunction) {
    try {
        const authHeader = req.get("Authorization");
        if (!authHeader) {
            const error = new Error("Missing Token") as any;
            error.statusCode = 400;
            throw error;
        }
        const token = authHeader.split(" ")[1];
        (await jwt.verify(token, JWT_SECRET)) as JwtPayload;
        next();
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
