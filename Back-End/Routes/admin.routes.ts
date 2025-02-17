import express from 'express';
const adminController = require('../Controllers/admin.controller')

const router=express.Router();

router.delete('/retire-doctor/:id',adminController.retireDoctor);
router.delete('/remove-patient/:id',adminController.removePatient);
router.get('/view-all-patients',adminController.getAllPatients);
export default router;