import express from 'express';
import {adminController} from '../Controllers/admin.controller';

const adminRouter=express.Router();

// adminRouter.delete('/retire-doctor/:id',adminController.retireDoctor);
export default adminRouter;