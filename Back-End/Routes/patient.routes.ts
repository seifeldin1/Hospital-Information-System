import express from 'express';
import verifyToken from '../Middleware/verifyToken';
import verifyRole from '../Middleware/verifyRole';
const patientController = require('../Controllers/patient.controller')
const router=express.Router();

router.get('/view-patient',patientController.getPatient);
router.put('/update-patient-info/:id',patientController.editPatient);
export default router;