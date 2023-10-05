import express from "express";
import * as Employee from "../controllers/home";
import { isAuth } from "../middlewares/is-auth";

const router = express.Router();

router
    .post("/login", Employee.login)
    .post("/add-emp", isAuth, Employee.addEmployee)
    .delete("/delete-emp", Employee.deleteEmployee)
    .post("/add-details", isAuth, Employee.addDetails)
    .get("/stats", isAuth, Employee.getSS)
    .get("/stats-oncontract", isAuth, Employee.getSSOfOnContract)
    .get("/stats-department", isAuth, Employee.getSSByDepartment)
    .get(
        "/stats-department-subdepartment",
        isAuth,
        Employee.getSSByDepartmentSubdepartment
    );

export default router;
