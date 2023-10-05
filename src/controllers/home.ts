import { Request, Response, NextFunction } from "express";
import Employee from "../models/emp";
import { USER } from "../constants/constant";
import jwt from "jsonwebtoken";
import { data } from "../constants/data";

const JWT_SECRET = process.env.JWT_SECRET;

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            const error = new Error("Credentials Not Found") as any;
            error.statusCode = 400;
            throw error;
        }
        if (username === USER.username && password === USER.password) {
            const token = await jwt.sign(
                {
                    username: username,
                },
                JWT_SECRET,
                {
                    expiresIn: "1d",
                }
            );
            res.status(200).json({
                status: "Success",
                message: "Logged In",
                token,
            });
        } else {
            const error = new Error("Invalid Username or Password") as any;
            error.statusCode = 400;
            throw error;
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

export async function addEmployee(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const {
            name,
            salary,
            currency,
            department,
            sub_department,
            on_contract,
        } = req.body;
        if (
            !name ||
            !salary ||
            !currency ||
            !department ||
            !sub_department ||
            !on_contract
        ) {
            const error = new Error("Missing Info") as any;
            error.statusCode = 400;
            throw error;
        }
        const emp = new Employee({
            name,
            salary,
            currency,
            department,
            sub_department,
            on_contract,
        });
        await emp.save();
        res.status(201).json({
            status: "Success",
            message: "New Employee Added",
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

export async function deleteEmployee(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const {
            name,
            salary,
            currency,
            department,
            sub_department,
            on_contract,
        } = req.body;
        if (
            !name ||
            !salary ||
            !currency ||
            !department ||
            !sub_department ||
            !on_contract
        ) {
            const error = new Error("Missing Info") as any;
            error.statusCode = 400;
            throw error;
        }
        const deletedEmp = await Employee.findOneAndDelete({
            name,
            salary,
            currency,
            department,
            sub_department,
            on_contract,
        });
        if (deletedEmp) {
            res.status(201).json({
                status: "Success",
                message: "Employee Removed",
            });
        } else {
            const error = new Error("Employee Not Found") as any;
            error.statusCode = 404;
            throw error;
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

export async function addDetails(
    _req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        for (let emp of data) {
            await Employee.findOneAndUpdate(emp, emp, {
                upsert: true,
            });
        }
        res.status(201).json({
            status: "Success",
            message: "Employees Data Added",
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

export async function getSS(_req: Request, res: Response, next: NextFunction) {
    try {
        const pipeline = [
            {
                $group: {
                    _id: null,
                    mean_salary: { $avg: { $toDouble: "$salary" } },
                    min_salary: { $min: { $toDouble: "$salary" } },
                    max_salary: { $max: { $toDouble: "$salary" } },
                },
            },
            {
                $project: {
                    _id: 0,
                    mean_salary: 1,
                    min_salary: 1,
                    max_salary: 1,
                },
            },
        ];

        const salaryStats = await Employee.aggregate(pipeline);

        res.status(200).json({
            status: "Success",
            data: salaryStats,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

export async function getSSOfOnContract(
    _req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const pipeline = [
            {
                $match: {
                    on_contract: true,
                },
            },
            {
                $group: {
                    _id: null,
                    mean_salary: { $avg: { $toDouble: "$salary" } },
                    min_salary: { $min: { $toDouble: "$salary" } },
                    max_salary: { $max: { $toDouble: "$salary" } },
                },
            },
            {
                $project: {
                    _id: 0,
                    mean_salary: 1,
                    min_salary: 1,
                    max_salary: 1,
                },
            },
        ];

        const salaryStats = await Employee.aggregate(pipeline);

        res.status(200).json({
            status: "Success",
            data: salaryStats,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

export async function getSSByDepartment(
    _req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const departmentStats = await Employee.aggregate([
            {
                $group: {
                    _id: "$department",
                    mean_salary: { $avg: { $toDouble: "$salary" } },
                    min_salary: { $min: { $toDouble: "$salary" } },
                    max_salary: { $max: { $toDouble: "$salary" } },
                },
            },
        ]);
        res.status(200).json({
            status: "Success",
            data: departmentStats,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

export async function getSSByDepartmentSubdepartment(
    _req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const pipeline = [
            {
                $group: {
                    _id: {
                        department: "$department",
                        sub_department: "$sub_department",
                    },
                    mean_salary: { $avg: { $toDouble: "$salary" } },
                    min_salary: { $min: { $toDouble: "$salary" } },
                    max_salary: { $max: { $toDouble: "$salary" } },
                },
            },
            {
                $project: {
                    _id: 0,
                    department: "$_id.department",
                    sub_department: "$_id.sub_department",
                    mean_salary: 1,
                    min_salary: 1,
                    max_salary: 1,
                },
            },
        ];

        const departmentSubdepartmentStats = await Employee.aggregate(pipeline);

        res.status(200).json({
            status: "Success",
            data: departmentSubdepartmentStats,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
