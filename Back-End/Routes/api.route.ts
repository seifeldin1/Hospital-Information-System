import express from 'express';
const router=express.Router();

import feedbackRoutes from "../Routes/feedback.routes";
import adminRouter from './admin.routes';

router.use("/feedback", feedbackRoutes);
router.use('/admin',adminRouter);


export default router;