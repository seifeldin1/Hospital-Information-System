import express from "express";
const doctorController = require('../Controllers/doctor.controller')
const adminController =require('../Controllers/admin.controller');
const router = express.Router();

router.post("/add" , doctorController.addDoctor)
router.get("/:id" , doctorController.getDoctor)
router.get("/" , doctorController.getAllDoctors)
router.put("/:id" , doctorController.editDoctorInfo)
router.delete("/:id" , doctorController.deleteDoctor)
router.get('/view-all-patients',adminController.getAllPatients);

export default router