import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function isAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(400).json({
            status: "Failed",
            message: "Missing Token",
        });
    }
    const token = authHeader.split(" ")[1];
    try {
        (await jwt.verify(token, JWT_SECRET)) as JwtPayload;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(400).json({
                status: "Failed",
                message: "Expired Token",
            });
        }
        res.status(400).json({
            status: "Failed",
            message: "Wrong Token",
        });
    }
}
