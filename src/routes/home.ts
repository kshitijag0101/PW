import express from "express";
import {
    login,
    addEmployee,
    deleteEmployee,
    addDetails,
    getSS,
    getSSOfOnContract,
    getSSByDepartment,
    getSSByDepartmentSubdepartment,
} from "../controllers/home";
import { isAuth } from "../middlewares/is-auth";

const router = express.Router();

router
    .post("/login", login)
    .post("/add-emp", isAuth, addEmployee)
    .delete("/delete-emp", deleteEmployee)
    .post("add-details", isAuth, addDetails)
    .get("/stats", isAuth, getSS)
    .get("/stats-oncontract", isAuth, getSSOfOnContract)
    .get("/stats-department", isAuth, getSSByDepartment)
    .get(
        "/stats-department-subdepartment",
        isAuth,
        getSSByDepartmentSubdepartment
    );

export default router;
