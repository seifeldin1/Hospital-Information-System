import express from "express";
const doctorController = require('../Controllers/doctor.controller')
const router = express.Router();

router.post("/" , doctorController.addDoctor)
router.get("/:doctorID" , doctorController.getDoctor)
router.get("/" , doctorController.getAllDoctors)
router.put("/:doctorID" , doctorController.editDoctorInfo)
router.delete("/:doctorID" , doctorController.deleteDoctor)

export default router