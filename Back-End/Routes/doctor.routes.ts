import express from "express";
const doctorController = require('../Controllers/doctor.controller')
const adminController =require('../Controllers/admin.controller');
const router = express.Router();

router.post("/" , doctorController.addDoctor)
router.get("/:doctorID" , doctorController.getDoctor)
router.get("/" , doctorController.getAllDoctors)
router.put("/:doctorID" , doctorController.editDoctorInfo)
router.delete("/:doctorID" , doctorController.deleteDoctor)
router.get('/view-all-patients',adminController.getAllPatients);

export default router