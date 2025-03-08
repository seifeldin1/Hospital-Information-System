import express from 'express';
import verifyToken from '../Middleware/verifyToken';
import verifyRole from '../Middleware/verifyRole';
import authorizePatient from '../Middleware/authorizePatient';
const patientController = require('../Controllers/patient.controller')
const router=express.Router();

// router.get('/view-patient',patientController.getPatient); //we can use the view all patients of admin
router.put('/update-patient-info/:id',verifyToken,verifyRole(["Patient"]),authorizePatient,patientController.editPatient);
export default router;