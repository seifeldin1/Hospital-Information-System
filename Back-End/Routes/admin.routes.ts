import express from 'express';
import verifyToken from '../Middleware/verifyToken';
const adminController = require('../Controllers/admin.controller')
const doctorController = require('../Controllers/doctor.controller')
import verifyRole from '../Middleware/verifyRole';

const router=express.Router();

// router.delete('/retire-doctor/:id',adminController.retireDoctor);
router.delete('/remove-patient/:id',adminController.removePatient);
router.get('/view-all-patients',adminController.getAllPatients);
// router.get("/view-all-doctors" , doctorController.getAllDoctors)
export default router;