import express from 'express';
const router=express.Router();

import feedbackRoutes from "./feedback.routes";
import adminRouter from './admin.routes';
import doctorRoutes from './doctor.routes';
import registrationRoutes from './registration.routes';
import patientRoutes from './patient.routes';

router.use("/feedback", feedbackRoutes);
router.use('/admin',adminRouter);
router.use("/doctors" , doctorRoutes)
router.use("/" , registrationRoutes)
router.use("/patient",patientRoutes)

export default router;