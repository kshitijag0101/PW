import { Request, Response } from "express";
import Employee from "../models/emp";
import { USER } from "../constants/constant";
import jwt from "jsonwebtoken";
import { data } from "../constants/data";

const JWT_SECRET = process.env.JWT_SECRET;

export async function login(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                status: "Failed",
                message: "Credentials Not Found",
            });
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
            res.status(400).json({
                status: "Failed",
                message: "Invalid Username or Password",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "Failed",
            message: "Something went Wrong",
        });
    }
}

export async function addEmployee(req: Request, res: Response) {
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
            return res.status(400).json({
                status: "Failed",
                message: "Missing Info",
            });
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
        res.status(500).json({
            status: "Failed",
            message: "Something went Wrong",
        });
    }
}

export async function deleteEmployee(req: Request, res: Response) {
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
            return res.status(400).json({
                status: "Failed",
                message: "Missing Info",
            });
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
            res.status(404).json({
                status: "Failed",
                message: "Employee Not Found",
            });
        }
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: "Something went Wrong",
        });
    }
}

export async function addDetails(_req: Request, res: Response) {
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
        res.status(500).json({
            status: "Failed",
            message: "Something went Wrong, Data Not Added",
        });
    }
}

export async function getSS(_req: Request, res: Response) {
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
        res.status(500).json({
            status: "Failed",
            message: "Something went Wrong",
        });
    }
}

export async function getSSOfOnContract(_req: Request, res: Response) {
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
        res.status(500).json({
            status: "Failed",
            message: "Something went Wrong",
        });
    }
}

export async function getSSByDepartment(_req: Request, res: Response) {
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
        res.status(500).json({
            status: "Failed",
            message: "Something went Wrong",
        });
    }
}

export async function getSSByDepartmentSubdepartment(
    _req: Request,
    res: Response
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
        res.status(500).json({
            status: "Failed",
            message: "Something went Wrong",
        });
    }
}
