import express from "express";
const doctorController = require('../Controllers/doctor.controller')
import verifyToken from '../Middleware/verifyToken';
const router = express.Router();

router.post("/add" , doctorController.addDoctor)
router.get("/:id" , doctorController.getDoctor)
router.get("/" , doctorController.getAllDoctors)
router.put("/:id" , doctorController.editDoctorInfo)
router.delete("/:id" , doctorController.deleteDoctor)

export default router