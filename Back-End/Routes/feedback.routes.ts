import { Router } from "express";
import { feedbackController } from "../Controllers/feedback.controller";

const router = Router();

router.post("/", feedbackController.createFeedback);
router.get("/", feedbackController.getFeedback);

export default router;
